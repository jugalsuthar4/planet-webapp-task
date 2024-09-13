import { useMemo } from 'react';

interface PasswordRequirementsProps {
  passwordErrors: {
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    number: boolean;
    special: boolean;
  };
}

const PasswordRequirements: React.FC<PasswordRequirementsProps> = ({
  passwordErrors,
}) => {
  const requirements = useMemo(
    () => (
      <p className="text-xs">
        Password:
        <span
          className={passwordErrors?.length ? 'text-green-500' : 'text-red-500'}
        >
          {' '}
          8+
        </span>
        <span
          className={
            passwordErrors?.uppercase ? 'text-green-500' : 'text-red-500'
          }
        >
          {' '}
          A-Z
        </span>
        <span
          className={
            passwordErrors?.lowercase ? 'text-green-500' : 'text-red-500'
          }
        >
          {' '}
          a-z
        </span>
        <span
          className={passwordErrors?.number ? 'text-green-500' : 'text-red-500'}
        >
          {' '}
          0-9
        </span>
        <span
          className={
            passwordErrors?.special ? 'text-green-500' : 'text-red-500'
          }
        >
          {' '}
          @#$
        </span>
      </p>
    ),
    [passwordErrors]
  );

  return <div className="text-sm mt-2">{requirements}</div>;
};

export default PasswordRequirements;
