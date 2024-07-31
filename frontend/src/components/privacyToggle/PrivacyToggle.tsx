import React, { ChangeEvent } from 'react';

interface PrivacyToggleProps {
  privacy: string | null | undefined;
  handlePrivacyChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const PrivacyToggle: React.FC<PrivacyToggleProps> = ({
  privacy,
  handlePrivacyChange,
}) => {
  return (
    <div>
      <label htmlFor="privacy-toggle">
        Privacy:
        <input
          id="privacy-toggle"
          type="checkbox"
          checked={privacy === 'private'}
          onChange={handlePrivacyChange}
        />
      </label>
    </div>
  );
};

export default PrivacyToggle;
