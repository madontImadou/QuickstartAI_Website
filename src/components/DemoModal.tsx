import React, { useState } from 'react';
import { X, Send, CheckCircle } from 'lucide-react';
import { saveDemoRequest } from '../services/databaseService';

interface DemoModalProps {
  websiteUrl: string;
  onClose: () => void;
}

const DemoModal: React.FC<DemoModalProps> = ({ websiteUrl, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Input validation
    if (!formData.name.trim() || !formData.email.trim() || !websiteUrl.trim()) {
      alert('Bitte füllen Sie alle Pflichtfelder aus.');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
      return;
    }
    
    // URL validation
    try {
      new URL(websiteUrl);
    } catch {
      alert('Bitte geben Sie eine gültige Website-URL ein.');
      return;
    }
    
    setIsSubmitting(true);

    try {
      const success = await saveDemoRequest({
        name: formData.name,
        email: formData.email,
        websiteUrl: websiteUrl
      });

      if (success) {
        setIsSubmitted(true);
      } else {
        alert('Fehler beim Speichern der Anfrage. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.');
      }
    } catch (error) {
      console.error('Fehler beim Speichern der Demo-Anfrage:', error);
      alert('Fehler beim Speichern der Anfrage. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.');
    } finally {
      setIsSubmitting(false);
    }

    // Auto-close after 3 seconds
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Demo angefordert!</h3>
          <p className="text-gray-600 mb-6">
            Vielen Dank! Ihre Demo-Anfrage wurde erfolgreich gespeichert. Wir melden uns innerhalb von 24 Stunden bei Ihnen.
          </p>
          <p className="text-sm text-gray-500">
            Dieses Fenster schließt sich automatisch...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-white">Demo anfordern</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-300 mb-2">Website:</p>
          <p className="font-semibold text-[#e2642a] bg-gray-800/50 p-3 rounded-lg break-all">
            {websiteUrl}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#e2642a] focus:border-transparent outline-none transition-all text-white placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              E-Mail-Adresse *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#e2642a] focus:border-transparent outline-none transition-all text-white placeholder-gray-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-[#e2642a] to-orange-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-orange-600 hover:to-[#e2642a] transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Anfrage speichern</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
        <p className="text-xs text-gray-400 mt-4 text-center">
          Ihre Anfrage wird sicher in unserer Datenbank gespeichert und vertraulich behandelt.
        </p>
      </div>
    </div>
  );
};

export default DemoModal;