"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

export type RuleTab = {
  key: string;
  label: ReactNode;
  file: string;
  panel: ReactNode;
};

type RuleTabsProps = {
  label: string;
  tabs: RuleTab[];
};

export function RuleTabs({ label, tabs }: RuleTabsProps) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const last = tabs.length - 1;

  const focusTab = (index: number) => {
    setActive(index);
    tabRefs.current[index]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const targets: Record<string, number> = {
      ArrowRight: active === last ? 0 : active + 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    };
    const target = targets[event.key];
    if (target === undefined) {
      return;
    }
    event.preventDefault();
    focusTab(target);
  };

  return (
    <>
      <div className="rule-panel__bar">
        <div className="rule-panel__tabs" role="tablist" aria-label={label} onKeyDown={handleKeyDown}>
          {tabs.map((tab, index) => {
            const selected = index === active;
            return (
              <button
                key={tab.key}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`${baseId}-tab-${tab.key}`}
                aria-controls={`${baseId}-panel-${tab.key}`}
                aria-selected={selected}
                tabIndex={selected ? 0 : -1}
                className="rule-panel__tab"
                onClick={() => setActive(index)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
        <span className="rule-panel__file">{tabs[active].file}</span>
      </div>
      <div className="rule-panel__panels">
        {tabs.map((tab, index) => (
          <div
            key={tab.key}
            role="tabpanel"
            id={`${baseId}-panel-${tab.key}`}
            aria-labelledby={`${baseId}-tab-${tab.key}`}
            tabIndex={0}
            hidden={index !== active}
            className="rule-panel__panel"
          >
            {tab.panel}
          </div>
        ))}
      </div>
    </>
  );
}
