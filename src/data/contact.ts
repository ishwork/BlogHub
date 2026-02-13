export type ContactInfo = {
  id: string;
  type: string;
  label: string;
  value: string;
};

export const contactData: ContactInfo[] = [
  {
    id: '1',
    type: 'email',
    label: 'Email',
    value: 'ishworkhadka70@gmail.com',
  },
  {
    id: '2',
    type: 'phone',
    label: 'Phone',
    value: '+358449670191',
  },
  {
    id: '3',
    type: 'address',
    label: 'Address',
    value: 'Espoo, Finland',
  },
  {
    id: '4',
    type: 'hours',
    label: 'Response Time',
    value: 'Typically respond within 24 hours',
  },
];
