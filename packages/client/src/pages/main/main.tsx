import React from 'react';
import styles from './styles.module.css';
import { JSX } from 'react/jsx-runtime';
import { AppPath } from '../../common/enums/enums';
import { NavLink } from '../../components/components';
import logoSrc from '~/assets/images/small-logo.svg';
import { UserDto } from '../../common/types/types';
import { Link } from 'react-router-dom';

const Dumbbell = (
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M14.4 14.4 9.6 9.6" />
    <path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z" />
    <path d="m21.5 21.5-1.4-1.4" />
    <path d="M5.343 2.515a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829L6.366 9.979a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.828z" />
    <path d="m2.5 2.5 1.4 1.4" />
  </svg>
);

const BarChart4 = (
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M3 3v18h18" />
    <path d="M13 17V9" />
    <path d="M18 17V5" />
    <path d="M8 17v-3" />
  </svg>
);

const Users = (
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const Search = (
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

type Props = {
  user: UserDto | null;
};

const Main = ({ user }: Props) => {
  return (
    <div className={styles.appContainer}>
      <div className={styles.mainContent}>
        {/* Section 1: Hero/Intro */}
        <section className={styles.heroSection}>
          <NavLink className={styles.heroIcon} to={AppPath.ROOT}>
            <img alt="logo" src={logoSrc} className={styles.heroIcon} />
          </NavLink>
          <h1 className={styles.heroTitle}>Your Ultimate Workout Companion</h1>
          <p className={styles.heroSubtitle}>
            Track your progress, discover new exercises, and climb the
            leaderboard. Stay motivated and achieve your fitness goals faster
            than ever.
          </p>
        </section>

        {/* Section 2: Features/Opportunities */}
        <section className={styles.featuresSection}>
          <h2 className={styles.sectionTitle}>
            Everything You Need to Succeed
          </h2>
          <div className={styles.featuresGrid}>
            {/* Feature Card 1: Browse Exercises */}
            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <Search className={styles.featureIcon} />
              </div>
              <h3 className={styles.featureTitle}>Browse Exercises</h3>
              <p className={styles.featureDescription}>
                Explore a vast library of exercises with detailed instructions
                and video demonstrations. Find the perfect workout for any
                muscle group.
              </p>
            </div>

            {/* Feature Card 2: Track Workouts */}
            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <Dumbbell className={styles.featureIcon} />
              </div>
              <h3 className={styles.featureTitle}>Create & Log Workouts</h3>
              <p className={styles.featureDescription}>
                Easily build custom workout routines or log your activities on
                the fly. We'll keep track of your sets, reps, and weights.
              </p>
            </div>

            {/* Feature Card 3: See Stats */}
            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <BarChart4 className={styles.featureIcon} />
              </div>
              <h3 className={styles.featureTitle}>Visualize Your Progress</h3>
              <p className={styles.featureDescription}>
                Watch your strength and endurance grow with insightful charts
                and statistics. Celebrate your personal records and milestones.
              </p>
            </div>

            {/* Feature Card 4: Friends & Leaderboard */}
            <div className={styles.featureCardLarge}>
              <div className={styles.featureCardLargeContent}>
                <div className={styles.featureCardLargeIconContainer}>
                  <div className={styles.featureIconWrapperLarge}>
                    <Users className={styles.featureIconLarge} />
                  </div>
                </div>
                <div>
                  <h3 className={styles.featureTitle}>Compete with Friends</h3>
                  <p className={styles.featureDescription}>
                    Connect with friends, share your progress, and compete for
                    the top spot on the leaderboard. A little friendly
                    competition goes a long way!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Gallery */}
        <section className={styles.gallerySection}>
          <h2 className={styles.sectionTitle}>See It In Action</h2>
          <div className={styles.galleryGrid}>
            <div className={styles.galleryItem}>
              <img
                src="https://placehold.co/600x400/1F2937/7C3AED?text=Dashboard"
                alt="Workout Dashboard"
                className={styles.galleryImage}
              />
              <div className={styles.galleryOverlay}>
                <p className={styles.galleryOverlayText}>Your Dashboard</p>
              </div>
            </div>
            <div className={styles.galleryItem}>
              <img
                src="https://placehold.co/600x400/1F2937/7C3AED?text=Exercise+List"
                alt="Exercise List"
                className={styles.galleryImage}
              />
              <div className={styles.galleryOverlay}>
                <p className={styles.galleryOverlayText}>Exercise Library</p>
              </div>
            </div>
            <div className={`${styles.galleryItem} ${styles.galleryItemLarge}`}>
              <img
                src="https://placehold.co/600x400/1F2937/7C3AED?text=Progress+Chart"
                alt="Progress Chart"
                className={styles.galleryImage}
              />
              <div className={styles.galleryOverlay}>
                <p className={styles.galleryOverlayText}>Progress Charts</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Subscribe/CTA */}
        <section className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Ready to Get Started?</h2>
          <p className={styles.ctaSubtitle}>
            Create an account to save your progress and unlock all features.
            Join our community and start your fitness journey today!
          </p>
          <div className={styles.ctaButtons}>
            {user ? (
              <Link to={AppPath.EXERCISES} className={styles.buttonPrimary}>
                Browse Exercises
              </Link>
            ) : (
              <>
                <Link to={AppPath.SIGN_UP} className={styles.buttonPrimary}>
                  Register for Free
                </Link>
                <Link to={AppPath.SIGN_IN} className={styles.buttonSecondary}>
                  Log In
                </Link>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export { Main };
