import coursera from '../assets/Academic/coursera.svg'
import seneca from '../assets/Academic/seneca.jpg'
import sxc from '../assets/Academic/sxc.png'

export const header = 'Academic Profile'

export const academicData = [
  {
    id: 'seneca-data-science',
    img: seneca,
    name: 'Seneca Polytechnic',
    course: 'Honours Bachelor of Data Science and Analytics',
    date: 'Sep 2023 - Aug 2027',
    type: 'Education',
    summary: 'Current undergraduate work across statistics, programming, analytics, and applied data science systems.',
    url: 'https://www.senecapolytechnic.ca/programs/fulltime/DSA.html',
  },
  {
    id: 'st-xaviers-physics',
    img: sxc,
    name: "St. Xavier's College, Maitighar",
    course: 'High School, Physics',
    date: 'Jul 2018 - Aug 2020',
    type: 'Education',
    summary: 'Physics-focused academic foundation that still shapes the math-first approach behind current projects.',
    url: 'https://www.sxc.edu.np/',
  },
  {
    id: 'google-advanced-data-analytics',
    img: coursera,
    name: 'Coursera',
    course: 'Google Advanced Data Analytics Certificate',
    date: 'Issued Nov 2024',
    type: 'Certification',
    summary: 'Structured practice in data analysis, statistical thinking, predictive modeling, and communication.',
    url: 'https://www.credly.com/badges/68666069-aa64-431a-a831-4f8a2f5ee1b7/linked_in_profile',
  },
]
