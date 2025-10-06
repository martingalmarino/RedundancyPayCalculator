import { ArrowRight, Phone, Mail } from 'lucide-react';

export default function CTASection() {
  return (
    <div className="bg-primary-50 border border-primary-200 rounded-xl p-8 text-center">
      <div className="max-w-2xl mx-auto">
        <h3 className="text-2xl font-bold text-primary-900 mb-4">
          Need Help with Your Redundancy Case?
        </h3>
        <p className="text-primary-700 mb-6 leading-relaxed">
          If you're facing redundancy or have questions about your rights, 
          consider consulting with employment solicitors in Ireland for personalized legal advice.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:+353123456789"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary-800 text-white font-medium rounded-lg hover:bg-primary-900 transition-colors"
          >
            <Phone className="h-5 w-5 mr-2" />
            Call Now
          </a>
          <a
            href="mailto:info@employmentlaw.ie"
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-800 font-medium rounded-lg border border-primary-800 hover:bg-primary-50 transition-colors"
          >
            <Mail className="h-5 w-5 mr-2" />
            Email Us
          </a>
        </div>
        
        <p className="text-sm text-primary-600 mt-4">
          Free initial consultation available
        </p>
      </div>
    </div>
  );
}
