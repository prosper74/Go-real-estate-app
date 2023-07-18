import { FC, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const ResendEmailVerificationButton: FC = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [countdown, setCountdown] = useState<number>(0);

  const handleResendEmailVerification = () => {
    // Perform the resend email verification logic here...
    
    setIsDisabled(true);
    setCountdown(24 * 60 * 60);
    Cookies.set('resendEmailCountdown', (24 * 60 * 60).toString(), { expires: 1 });
  };

  useEffect(() => {
    const storedCountdown = Cookies.get('resendEmailCountdown');
    if (storedCountdown) {
      const parsedCountdown = parseInt(storedCountdown);
      if (!isNaN(parsedCountdown)) {
        setCountdown(parsedCountdown);
      }
    }
  }, []);

  useEffect(() => {
    const updateCountdown = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(updateCountdown);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      setIsDisabled(false);
      Cookies.remove('resendEmailCountdown');
    } else {
      Cookies.set('resendEmailCountdown', countdown.toString(), { expires: 1 });
    }
  }, [countdown]);

  const hours = Math.floor(countdown / 3600);
  const minutes = Math.floor((countdown % 3600) / 60);
  const seconds = countdown % 60;
  const countdownString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div>
      <button onClick={handleResendEmailVerification} disabled={isDisabled}>
        {isDisabled ? `Resend Email Verification in ${countdownString}` : 'Resend Email Verification'}
      </button>
    </div>
  );
};

export default ResendEmailVerificationButton;
