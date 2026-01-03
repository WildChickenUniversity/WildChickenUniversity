const getAdmissionTagline = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // note month start from 0...
  if (currentMonth > 7) return `Spring ${currentYear + 1}.`;
  else if (currentMonth > 1) return `Fall ${currentYear}.`;
  return `Spring ${currentYear}.`;
};

export const menuEntries: Record<string, string> = {
  Admission: `Apply for ${getAdmissionTagline()}`,
  Diploma: "Too Old for School?",
  About: "How Chicken Type?",
  Review: "Squwak Squwak?",
};

export const menuPaths: Record<string, string> = {
  Admission: "/admission",
  Diploma: "/diploma",
  About: "/pages/about",
  Review: "/review",
};

export const navbarPaths: Record<string, string> = {
  Admission: "/admission",
  Diploma: "/diploma",
  Achievements: "/pages/achievements",
  Review: "/review",
  Alumni: "/pages/alumni",
  About: "/pages/about",
  Disclaimer: "/pages/disclaimer",
};
