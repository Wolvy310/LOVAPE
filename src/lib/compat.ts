export interface CompatibilityResult {
  compatible: boolean;
  reason?: string;
}

// Step E will replace this placeholder with full MTL compatibility rules.
export function checkMtlCompatibility(): CompatibilityResult {
  return { compatible: true };
}

