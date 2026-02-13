import { contactData } from '@/src/data/contact';

const Contact = () => (
  <div className="space-y-8">
    <div className="mb-12">
      <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">Get in Touch</h1>
      <p className="text-text/70 text-lg">
        Have questions or feedback? We'd love to hear from you.
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-8">
      {contactData.map((item) => (
        <div key={item.id} className="bg-card-background p-6 rounded-lg shadow-lg dark:bg-gray-900">
          <h3 className="text-xl font-semibold text-text mb-2">{item.label}</h3>
          <p className="text-text/80 text-lg break-word">{item.value}</p>
        </div>
      ))}
    </div>
  </div>
);

export default Contact;
