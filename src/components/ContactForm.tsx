import React, { useState } from 'react';
import { X, Send, CheckCircle, Mail, User, MessageCircle } from 'lucide-react';
import { saveContactRequest } from '../services/databaseService';

interface ContactFormProps {
  onClose: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Input validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert('Bitte füllen Sie alle Pflichtfelder aus.');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
      return;
    }
    
    // Message length validation
    if (formData.message.length > 2000) {
      alert('Die Nachricht darf maximal 2000 Zeichen lang sein.');
      return;
    }
    
    setIsSubmitting(true);

    try {
      const success = await saveContactRequest({
        name: formData.name,
        email: formData.email,
        message: formData.message
      });

      if (success) {
        setIsSubmitted(true);
      } else {
        alert('Fehler beim Speichern der Nachricht. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.');
      }
    } catch (error) {
      console.error('Fehler beim Speichern der Kontakt-Anfrage:', error);
      alert('Fehler beim Speichern der Nachricht. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.');
    } finally {
      setIsSubmitting(false);
    }

    // Auto-close after 3 seconds
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Nachricht gesendet!</h3>
          <p className="text-gray-300 mb-6">
            Vielen Dank für Ihre Nachricht! Sie wurde erfolgreich gespeichert. Wir melden uns schnellstmöglich bei Ihnen zurück.
          </p>
          <p className="text-sm text-gray-400">
            Dieses Fenster schließt sich automatisch...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-white">Kontakt aufnehmen</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="contact-name" className="block text-sm font-medium text-gray-300 mb-2">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Name *</span>
              </div>
            </label>
            <input
              type="text"
              id="contact-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#e2642a] focus:border-transparent outline-none transition-all text-white placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label htmlFor="contact-email" className="block text-sm font-medium text-gray-300 mb-2">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>E-Mail-Adresse *</span>
              </div>
            </label>
            <input
              type="email"
              id="contact-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#e2642a] focus:border-transparent outline-none transition-all text-white placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label htmlFor="contact-message" className="block text-sm font-medium text-gray-300 mb-2">
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4" />
                <span>Nachricht *</span>
              </div>
            </label>
            <textarea
              id="contact-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#e2642a] focus:border-transparent outline-none transition-all resize-vertical text-white placeholder-gray-400"
              placeholder="Beschreiben Sie Ihr Anliegen..."
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
                <span>Nachricht speichern</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-700">
          <p className="text-sm text-gray-300 text-center">
            Oder kontaktieren Sie uns direkt:
          </p>
          <div className="mt-2 text-center">
            <a 
              href="mailto:maximilian@quickstartai.de" 
              className="text-[#e2642a] hover:text-orange-400 font-medium"
            >
              info@quickstartai.de
            </a>
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-4 text-center">
          Ihre Nachricht wird sicher in unserer Datenbank gespeichert und vertraulich behandelt.
        </p>
      </div>
    </div>
  );
};

export default ContactForm;