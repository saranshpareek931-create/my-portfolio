import { profile } from '../data/portfolio';

/**
 * The hero portrait display for Saransh.
 * Faithful to the original repo: full-bleed cutout portrait,
 * glowing rim light halo ring, ambient floor pool, and smooth bottom fade.
 */
export default function HeroVideo({ play: _play }: { play?: boolean }) {
  return (
    <div className="hero-film is-idle relative mx-auto flex h-full w-full max-w-[620px] items-end justify-center">
      {/* Ambient floor spotlight pool */}
      <div aria-hidden="true" className="hero-film__pool" />

      {/* Rim light glowing halo ring from original repo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[10%] left-1/2 h-[76%] w-[86%] -translate-x-1/2 rounded-full border border-accent/20 shadow-[0_0_120px_var(--glow-strong),inset_0_0_80px_var(--glow)] transition-colors duration-500"
      />

      {/* Authentic cutout portrait with bottom gradient mask & drop shadow */}
      <img
        src={profile.portrait.src}
        srcSet={profile.portrait.srcSet}
        sizes="(max-width: 1024px) 100vw, 48vw"
        alt={profile.portrait.alt}
        draggable={false}
        className="hero-film__media relative z-10 block h-full w-auto max-h-[90vh] max-w-none object-contain object-bottom select-none drop-shadow-[0_30px_60px_rgba(0,0,0,0.75)] [mask-image:linear-gradient(to_bottom,black_64%,transparent_98%)]"
      />

      {/* Subtle atmospheric rim glow overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(60%_50%_at_78%_32%,var(--glow-strong),transparent_70%)] mix-blend-screen"
      />
    </div>
  );
}
