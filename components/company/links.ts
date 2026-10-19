export function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

export function hostOf(href: string) {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

export function externalProps(href: string, rel = "noopener") {
  return isExternal(href) ? { rel, target: "_blank" } : {};
}
