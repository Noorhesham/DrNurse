// Define interfaces for the job data structure

interface Branch {
  id: number;
  company_id: number;
  phone_number: string;
  address: string;
  created_by: number;
  updated_by: number;
  created_at: string;
  updated_at: string;
  capacity: number;
  name: string;
  country_id: number;
  city_id: number;
  state_id: number;
  country: {
    id: number;
    title: string;
    created_by: number;
  };
  city: {
    id: number;
    title: string;
    created_by: number;
  };
  state: {
    id: number;
    title: string;
    created_by: number;
  };
  // You can expand this further to include other fields as needed
}

interface CareerLevel {
  id: number;
  title: string;
  created_by: number | null;
  updated_by: number;
  created_at: string;
  updated_at: string;
}

export interface Job {
  currency: string;
  id: number;
  currency_id: number | null;
  benefits: string; // Consider parsing this string to an array if needed
  job_requirements: string | null;
  application_available_status: string | null;
  recipient_email: string | null;
  gender: string;
  job_description: string;
  hide_salary: number;
  max_salary: number;
  min_salary: number;
  experience_from: number;
  experience_to: number;
  work_place: string | null;
  job_title: string;
  bookmarked: boolean;
  status: string | null;
  company_id: number;
  family_status: string;
  branch_id: number;
  nationality_id: number;
  career_level_id: number;
  career_specialty_id: number;
  career_type_id: number;
  created_by: number;
  updated_by: number | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  recipient_status: string;
  branch: Branch;
  country: {
    id: number;
    title: string;
  };
  city: {
    id: number;
    title: string;
  };
  state: {
    id: number;
    title: string;
  };

  career_level: CareerLevel;
}
