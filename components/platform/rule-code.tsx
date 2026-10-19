type TokenKind = "key" | "string" | "keyword" | "function" | "literal" | "name" | "punct" | "plain";

type TokenRule = readonly [RegExp, TokenKind];

type Token = {
  kind: TokenKind;
  text: string;
};

export type RuleLanguage = "sigma" | "kql" | "spl";

const sigmaSource = String.raw`title: Office application starts a script interpreter
id: 3b7e2c41-9d58-4f0a-a6e2-71c4d08f5b93
status: stable
description: Word, Excel or PowerPoint launching a shell, often a macro at work
author: Cynorida detection engineering
date: 2026-09-14
tags:
  - attack.execution
  - attack.t1059.001
  - attack.t1204.002
logsource:
  product: windows
  category: process_creation
detection:
  selection_parent:
    ParentImage|endswith:
      - '\WINWORD.EXE'
      - '\EXCEL.EXE'
      - '\POWERPNT.EXE'
  selection_child:
    Image|endswith:
      - '\powershell.exe'
      - '\pwsh.exe'
      - '\cmd.exe'
      - '\wscript.exe'
  condition: selection_parent and selection_child
falsepositives:
  - Signed add-ins that call PowerShell during setup
level: high`;

const kqlSource = String.raw`DeviceProcessEvents
| where Timestamp > ago(24h)
| where InitiatingProcessFileName in~ (
    "winword.exe", "excel.exe", "powerpnt.exe")
| where FileName in~ (
    "powershell.exe", "pwsh.exe", "cmd.exe", "wscript.exe")
| project Timestamp, DeviceName, AccountName,
    InitiatingProcessFileName, FileName, ProcessCommandLine
| order by Timestamp desc`;

const splSource = String.raw`index=endpoint EventCode=1
  source="XmlWinEventLog:Microsoft-Windows-Sysmon/Operational"
  (ParentImage="*\\WINWORD.EXE"
    OR ParentImage="*\\EXCEL.EXE"
    OR ParentImage="*\\POWERPNT.EXE")
  (Image="*\\powershell.exe"
    OR Image="*\\pwsh.exe"
    OR Image="*\\cmd.exe"
    OR Image="*\\wscript.exe")
| table _time host User ParentImage Image CommandLine
| sort - _time`;

const sigmaRules: readonly TokenRule[] = [
  [/(?<=^\s*)- /y, "punct"],
  [/(?<=^\s*(?:- )?)[A-Za-z_][\w.]*(?:\|\w+)*(?=:)/y, "key"],
  [/:/y, "punct"],
  [/'[^']*'/y, "string"],
  [/(?<=^\s*condition:.*)\b(?:and|or|not)\b/y, "keyword"],
  [/(?<=^level:\s*)\w+/y, "literal"],
  [/(?<=^status:\s*)\w+/y, "literal"],
];

const kqlRules: readonly TokenRule[] = [
  [/"(?:[^"\\]|\\.)*"/y, "string"],
  [/\b(?:where|project|order|by|desc|and|or)\b/y, "keyword"],
  [/in~/y, "keyword"],
  [/\b(?:ago|dynamic)\b(?=\()/y, "function"],
  [/\b\d+[smhd]?\b/y, "literal"],
  [/\b[A-Za-z_]\w*\b/y, "name"],
  [/[|(),>=]/y, "punct"],
];

const splRules: readonly TokenRule[] = [
  [/"(?:[^"\\]|\\.)*"/y, "string"],
  [/\b(?:OR|AND|NOT)\b/y, "keyword"],
  [/(?<=\|\s*)(?:table|sort|stats)\b/y, "function"],
  [/\b[A-Za-z_]\w*(?==)/y, "key"],
  [/\b\d+\b/y, "literal"],
  [/\b[A-Za-z_]\w*\b/y, "name"],
  [/[|()=-]/y, "punct"],
];

const languages: Record<RuleLanguage, { source: string; rules: readonly TokenRule[] }> = {
  sigma: { source: sigmaSource, rules: sigmaRules },
  kql: { source: kqlSource, rules: kqlRules },
  spl: { source: splSource, rules: splRules },
};

function tokenize(line: string, rules: readonly TokenRule[]) {
  const tokens: Token[] = [];
  const push = (kind: TokenKind, text: string) => {
    const previous = tokens[tokens.length - 1];
    if (previous && previous.kind === kind) {
      previous.text += text;
      return;
    }
    tokens.push({ kind, text });
  };

  let index = 0;
  while (index < line.length) {
    let consumed = 0;
    for (const [pattern, kind] of rules) {
      pattern.lastIndex = index;
      const match = pattern.exec(line);
      if (match && match[0].length > 0) {
        push(kind, match[0]);
        consumed = match[0].length;
        break;
      }
    }
    if (consumed === 0) {
      push("plain", line[index]);
      consumed = 1;
    }
    index += consumed;
  }
  return tokens;
}

export function RuleCode({ language }: { language: RuleLanguage }) {
  const { source, rules } = languages[language];
  const lines = source.split("\n");

  return (
    <pre className="rule-code">
      <code className="rule-code__body">
        {lines.map((line, lineIndex) => (
          <span key={lineIndex} className="rule-code__line">
            <span className="rule-code__number numeric" aria-hidden="true">
              {lineIndex + 1}
            </span>
            <span className="rule-code__text">
              {line.length === 0
                ? " "
                : tokenize(line, rules).map((token, tokenIndex) =>
                    token.kind === "plain" ? (
                      token.text
                    ) : (
                      <span key={tokenIndex} className={`rule-code__token rule-code__token--${token.kind}`}>
                        {token.text}
                      </span>
                    ),
                  )}
            </span>
          </span>
        ))}
      </code>
    </pre>
  );
}
