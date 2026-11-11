/**
 * Helper utilities to control Swarm Rebuild
 */

export function startSwarm(options) {
  if (typeof window !== 'undefined' && window.__swarmRebuild) {
    window.__swarmRebuild.start(options);
  }
}

export function stopSwarm(reveal = true) {
  if (typeof window !== 'undefined' && window.__swarmRebuild) {
    window.__swarmRebuild.stop(reveal);
  }
}

export function restartSwarm() {
  if (typeof window !== 'undefined' && window.__swarmRebuild) {
    window.__swarmRebuild.restart();
  }
}

export function toggleSwarm() {
  if (typeof window !== 'undefined' && window.__swarmRebuild) {
    window.__swarmRebuild.toggle();
  }
}

export function isSwarmRunning() {
  if (typeof window !== 'undefined' && window.__swarmRebuild) {
    return window.__swarmRebuild.isRunning ? window.__swarmRebuild.isRunning() : Boolean(window.__swarmRebuild.app);
  }
  return false;
}
