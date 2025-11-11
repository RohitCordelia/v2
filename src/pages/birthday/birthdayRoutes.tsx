import { Routes, Route, Navigate } from 'react-router-dom';
import Birthday from './birthday';
import BirthdayOffers, { AnniversaryEndDate, AnniversaryStartDate } from './birthdayOffers';

const AnniversaryRoutes = () => {
  const now = new Date();

  // Timeline
  const regClose = new Date('2025-08-27T23:59:59');
  const earlyAccessStart = new Date('2025-08-27T00:00:00');
  const earlyAccessEnd = new Date('2025-08-31T23:59:59');
  const anniversaryStart = new Date(AnniversaryStartDate);
  const anniversaryEnd = new Date(AnniversaryEndDate);

  const isRegisterActive = now <= regClose;
  const isEarlyAccessActive = now >= earlyAccessStart && now <= earlyAccessEnd;
  const isAnniversaryActive = now >= anniversaryStart && now <= anniversaryEnd;

  return (
    <Routes>
      {/* Registration page (till 27 Aug) */}
      {/* {isRegisterActive && <Route path="register" element={<Birthday />} />} */}
      <Route path="register" element={<Birthday />} />
      
      {/* {isRegisterActive && (
        <>
          <Route path="earlyaccess" element={<Navigate to="../register" replace />} />
          <Route path="/" element={<Navigate to="register" replace />} />
        </>
      )} */}

      {/* Early access page (28–31 Aug) */}
      {isEarlyAccessActive && (
        <>
          <Route path="earlyaccess" element={<BirthdayOffers />} />
          <Route path="/" element={<Navigate to="earlyaccess" replace />} />
          <Route path="register" element={<Navigate to="/" replace />} />
        </>
      )}

      {/* Main campaign (1–28 Sep) */}
      {isAnniversaryActive && (
        <>
          <Route path="/" element={<BirthdayOffers />} />
          <Route path="earlyaccess" element={<Navigate to="../" replace />} />
          <Route path="register" element={<Navigate to="/" replace />} />
        </>
      )}

      {/* AFTER 28 Sep -> disable */}
      {!isRegisterActive && !isEarlyAccessActive && !isAnniversaryActive && (
        <Route path="*" element={<Navigate to="/" replace />} />
      )}
    </Routes>
  );
};

export default AnniversaryRoutes;
