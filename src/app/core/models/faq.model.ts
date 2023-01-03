import { StudentsRoutingModule } from "src/app/modules/user/students/students-routing.module";

export interface FaqList {
    data: FAQ[];
  }
  export interface FAQ {
    ques: string;
    answer: string;
    category: Category[];
    data: FAQ[];
    results: number;
    position: string;
    active: boolean;
    _id: string;
  };
  export interface Category {
    name: string;
    _id: string;
    position: string;
  }