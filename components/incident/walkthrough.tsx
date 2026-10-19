"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { Arrow } from "@/components/brand/arrow";
import type { Moment } from "./moments";

type WalkthroughProps = {
  moments: Moment[];
};

const stepKeys: Record<string, number> = {
  ArrowDown: 1,
  ArrowRight: 1,
  ArrowUp: -1,
  ArrowLeft: -1,
};

function tabId(moment: Moment) {
  return `incident-tab-${moment.id}`;
}

function panelId(moment: Moment) {
  return `incident-panel-${moment.id}`;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Walkthrough({ moments }: WalkthroughProps) {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const total = moments.length;
  const current = moments[active];
  const isLast = active === total - 1;

  function revealTab(index: number) {
    const list = listRef.current;
    const tab = tabRefs.current[index];
    if (!list || !tab || list.scrollWidth <= list.clientWidth) {
      return;
    }
    const left = tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2;
    list.scrollTo({ left, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }

  function select(index: number, moveFocus: boolean) {
    const next = (index + total) % total;
    setActive(next);
    revealTab(next);
    if (moveFocus) {
      tabRefs.current[next]?.focus({ preventScroll: true });
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key in stepKeys) {
      event.preventDefault();
      select(active + stepKeys[event.key], true);
    } else if (event.key === "Home") {
      event.preventDefault();
      select(0, true);
    } else if (event.key === "End") {
      event.preventDefault();
      select(total - 1, true);
    }
  }

  return (
    <div className="walkthrough">
      <div
        ref={listRef}
        className="walkthrough__steps"
        role="tablist"
        aria-orientation="vertical"
        aria-label="Timeline of sample incident INC-2417"
        onKeyDown={handleKeyDown}
      >
        {moments.map((moment, index) => {
          const state = index === active ? " is-active" : index < active ? " is-done" : "";
          return (
            <button
              key={moment.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              id={tabId(moment)}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-controls={panelId(moment)}
              tabIndex={index === active ? 0 : -1}
              className={`walkthrough__step walkthrough__step--${moment.tone}${state}`}
              onClick={() => select(index, false)}
            >
              <span className="walkthrough__node" aria-hidden="true" />
              <span className="walkthrough__time numeric">{moment.time}</span>
              <span className="walkthrough__label">{moment.label}</span>
              <span className="walkthrough__summary">{moment.summary}</span>
            </button>
          );
        })}
      </div>

      <div className="walkthrough__window">
        <div className="walkthrough__bar">
          <p className="walkthrough__crumbs">
            <span className="walkthrough__crumb walkthrough__crumb--root">Incidents</span>
            <span className="walkthrough__crumb-sep walkthrough__crumb--root" aria-hidden="true">
              /
            </span>
            <span className="walkthrough__crumb numeric">INC-2417</span>
            <span className="walkthrough__crumb-sep" aria-hidden="true">
              /
            </span>
            <span className="walkthrough__crumb walkthrough__crumb--current">{current.label}</span>
          </p>
          <p className="walkthrough__sample">Sample incident · synthetic data</p>
        </div>

        <div className="walkthrough__progress" aria-hidden="true">
          <span className="walkthrough__progress-fill" style={{ transform: `scaleX(${(active + 1) / total})` }} />
        </div>

        {moments.map((moment, index) => (
          <div
            key={moment.id}
            id={panelId(moment)}
            role="tabpanel"
            aria-labelledby={tabId(moment)}
            tabIndex={0}
            hidden={index !== active}
            className="walkthrough__panel"
          >
            {moment.content}
          </div>
        ))}

        <div className="walkthrough__foot">
          <p className="walkthrough__count numeric" aria-live="polite">
            Step {active + 1} of {total}
            <span className="walkthrough__count-label"> · {current.label}</span>
          </p>
          <div className="walkthrough__controls">
            <button
              type="button"
              className="button button--quiet walkthrough__control"
              onClick={() => select(active - 1, false)}
              disabled={active === 0}
            >
              <Arrow className="walkthrough__back-arrow" />
              Previous
            </button>
            <button
              type="button"
              className="button walkthrough__control"
              onClick={() => select(isLast ? 0 : active + 1, false)}
            >
              {isLast ? "Start again" : "Next"}
              <Arrow />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
