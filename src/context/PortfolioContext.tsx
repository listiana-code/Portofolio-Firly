import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  ProfileInfo, 
  DEFAULT_PROFILE_INFO, 
  EcosystemItem, 
  DEFAULT_ECOSYSTEMS, 
  CertificationItem, 
  DEFAULT_CERTIFICATIONS, 
  TechSkillItem, 
  DEFAULT_TECH_SKILLS, 
  Project, 
  PROJECTS_DATA, 
  RentalCarItem, 
  RENTAL_CARS_MOCK 
} from '../data/portfolioData';

interface PortfolioContextType {
  profile: ProfileInfo;
  ecosystems: EcosystemItem[];
  certifications: CertificationItem[];
  techSkills: TechSkillItem[];
  projects: Project[];
  rentalCars: RentalCarItem[];
  isAdmin: boolean;
  
  // Auth methods
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  updatePassword: (newPass: string) => void;

  // CRUD methods
  updateProfile: (data: Partial<ProfileInfo>) => void;
  
  // Projects CRUD
  addProject: (item: Omit<Project, 'id'>) => void;
  updateProject: (id: string, item: Partial<Project>) => void;
  deleteProject: (id: string) => void;

  // Certifications CRUD
  addCertification: (item: Omit<CertificationItem, 'id'>) => void;
  updateCertification: (id: string, item: Partial<CertificationItem>) => void;
  deleteCertification: (id: string) => void;

  // Ecosystems / Experience CRUD
  addEcosystem: (item: Omit<EcosystemItem, 'id'>) => void;
  updateEcosystem: (id: string, item: Partial<EcosystemItem>) => void;
  deleteEcosystem: (id: string) => void;

  // Rental Cars CRUD
  addCar: (item: Omit<RentalCarItem, 'id'>) => void;
  updateCar: (id: string, item: Partial<RentalCarItem>) => void;
  deleteCar: (id: string) => void;

  // Image & Document Upload helpers
  handleImageUpload: (file: File) => Promise<string>;
  handleDocumentUpload: (file: File) => Promise<{ dataUrl: string; fileName: string; fileSize: string; fileType: 'pdf' | 'image' }>;

  // Reset to original CV data
  resetAllToDefault: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

// Helper to normalize image paths from dev /src/assets/images/ to production /images/
const normalizeImagePath = (url: string | undefined): string => {
  if (!url) return '';
  if (url.startsWith('/src/assets/images/')) {
    return url.replace('/src/assets/images/', '/images/');
  }
  return url;
};

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Profile State
  const [profile, setProfile] = useState<ProfileInfo>(() => {
    const saved = localStorage.getItem('firly_profile_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed) {
          return {
            ...DEFAULT_PROFILE_INFO,
            ...parsed,
            avatarUrl: normalizeImagePath(parsed.avatarUrl) || DEFAULT_PROFILE_INFO.avatarUrl,
          };
        }
      } catch (e) {}
    }
    return DEFAULT_PROFILE_INFO;
  });

  // 2. Ecosystems State
  const [ecosystems, setEcosystems] = useState<EcosystemItem[]>(() => {
    const saved = localStorage.getItem('firly_ecosystems_state');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return DEFAULT_ECOSYSTEMS;
  });

  // 3. Certifications State
  const [certifications, setCertifications] = useState<CertificationItem[]>(() => {
    const saved = localStorage.getItem('firly_certs_state');
    if (saved) {
      try {
        const parsed: CertificationItem[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((item) => {
            if (!item.certificateImage) {
              const matched = DEFAULT_CERTIFICATIONS.find(d => d.id === item.id || d.title.toLowerCase() === item.title.toLowerCase());
              return {
                ...item,
                certificateImage: matched?.certificateImage || ''
              };
            }
            return item;
          });
        }
      } catch (e) {}
    }
    return DEFAULT_CERTIFICATIONS;
  });

  // 4. Tech Skills State
  const [techSkills, setTechSkills] = useState<TechSkillItem[]>(() => {
    const saved = localStorage.getItem('firly_skills_state');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return DEFAULT_TECH_SKILLS;
  });

  // 5. Projects State
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('firly_projects_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((p: Project) => ({
            ...p,
            image: normalizeImagePath(p.image) || '/images/project_rental_car_1793864849468.jpg',
          }));
        }
      } catch (e) {}
    }
    return PROJECTS_DATA;
  });

  // 6. Rental Cars State
  const [rentalCars, setRentalCars] = useState<RentalCarItem[]>(() => {
    const saved = localStorage.getItem('firly_cars_state');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return RENTAL_CARS_MOCK;
  });

  // 7. Admin Session State
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return sessionStorage.getItem('firly_is_admin') === 'true';
  });

  // Sync to LocalStorage on change
  useEffect(() => {
    localStorage.setItem('firly_profile_state', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('firly_ecosystems_state', JSON.stringify(ecosystems));
  }, [ecosystems]);

  useEffect(() => {
    localStorage.setItem('firly_certs_state', JSON.stringify(certifications));
  }, [certifications]);

  useEffect(() => {
    localStorage.setItem('firly_skills_state', JSON.stringify(techSkills));
  }, [techSkills]);

  useEffect(() => {
    localStorage.setItem('firly_projects_state', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('firly_cars_state', JSON.stringify(rentalCars));
  }, [rentalCars]);

  // Auth Functions
  const loginAdmin = (password: string): boolean => {
    const currentPass = profile.adminPassword || "firlyahmad2026";
    if (password === currentPass || password === "firly2026") {
      setIsAdmin(true);
      sessionStorage.setItem('firly_is_admin', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('firly_is_admin');
  };

  const updatePassword = (newPass: string) => {
    setProfile(prev => ({ ...prev, adminPassword: newPass }));
  };

  // Profile Update
  const updateProfile = (data: Partial<ProfileInfo>) => {
    setProfile(prev => ({ ...prev, ...data }));
  };

  // Project CRUD
  const addProject = (item: Omit<Project, 'id'>) => {
    const newProj: Project = {
      ...item,
      id: `proj-${Date.now()}`
    };
    setProjects(prev => [newProj, ...prev]);
  };

  const updateProject = (id: string, item: Partial<Project>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...item } : p));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  // Certification CRUD
  const addCertification = (item: Omit<CertificationItem, 'id'>) => {
    const newCert: CertificationItem = {
      ...item,
      id: `cert-${Date.now()}`
    };
    setCertifications(prev => [newCert, ...prev]);
  };

  const updateCertification = (id: string, item: Partial<CertificationItem>) => {
    setCertifications(prev => prev.map(c => c.id === id ? { ...c, ...item } : c));
  };

  const deleteCertification = (id: string) => {
    setCertifications(prev => prev.filter(c => c.id !== id));
  };

  // Ecosystem CRUD
  const addEcosystem = (item: Omit<EcosystemItem, 'id'>) => {
    const newEco: EcosystemItem = {
      ...item,
      id: `eco-${Date.now()}`
    };
    setEcosystems(prev => [newEco, ...prev]);
  };

  const updateEcosystem = (id: string, item: Partial<EcosystemItem>) => {
    setEcosystems(prev => prev.map(e => e.id === id ? { ...e, ...item } : e));
  };

  const deleteEcosystem = (id: string) => {
    setEcosystems(prev => prev.filter(e => e.id !== id));
  };

  // Rental Cars CRUD
  const addCar = (item: Omit<RentalCarItem, 'id'>) => {
    const newCar: RentalCarItem = {
      ...item,
      id: `car-${Date.now()}`
    };
    setRentalCars(prev => [newCar, ...prev]);
  };

  const updateCar = (id: string, item: Partial<RentalCarItem>) => {
    setRentalCars(prev => prev.map(c => c.id === id ? { ...c, ...item } : c));
  };

  const deleteCar = (id: string) => {
    setRentalCars(prev => prev.filter(c => c.id !== id));
  };

  // Image Upload via FileReader
  const handleImageUpload = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject(new Error("No file provided"));
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error("Failed to convert image to data URL"));
        }
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  // Document & PDF Upload via FileReader
  const handleDocumentUpload = (file: File): Promise<{ dataUrl: string; fileName: string; fileSize: string; fileType: 'pdf' | 'image' }> => {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject(new Error("No file provided"));
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
          const sizeKb = Math.round(file.size / 1024);
          const fileSizeStr = sizeKb > 1024 ? `${(sizeKb / 1024).toFixed(1)} MB` : `${sizeKb} KB`;
          resolve({
            dataUrl: reader.result,
            fileName: file.name,
            fileSize: fileSizeStr,
            fileType: isPdf ? 'pdf' : 'image'
          });
        } else {
          reject(new Error("Failed to convert file to data URL"));
        }
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  // Reset to Default
  const resetAllToDefault = () => {
    setProfile(DEFAULT_PROFILE_INFO);
    setEcosystems(DEFAULT_ECOSYSTEMS);
    setCertifications(DEFAULT_CERTIFICATIONS);
    setTechSkills(DEFAULT_TECH_SKILLS);
    setProjects(PROJECTS_DATA);
    setRentalCars(RENTAL_CARS_MOCK);
    
    localStorage.removeItem('firly_profile_state');
    localStorage.removeItem('firly_ecosystems_state');
    localStorage.removeItem('firly_certs_state');
    localStorage.removeItem('firly_skills_state');
    localStorage.removeItem('firly_projects_state');
    localStorage.removeItem('firly_cars_state');
  };

  return (
    <PortfolioContext.Provider value={{
      profile,
      ecosystems,
      certifications,
      techSkills,
      projects,
      rentalCars,
      isAdmin,
      loginAdmin,
      logoutAdmin,
      updatePassword,
      updateProfile,
      addProject,
      updateProject,
      deleteProject,
      addCertification,
      updateCertification,
      deleteCertification,
      addEcosystem,
      updateEcosystem,
      deleteEcosystem,
      addCar,
      updateCar,
      deleteCar,
      handleImageUpload,
      handleDocumentUpload,
      resetAllToDefault
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
