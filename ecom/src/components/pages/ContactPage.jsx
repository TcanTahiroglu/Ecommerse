import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa"; // İkonları import ediyoruz

const ContactPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white shadow-lg rounded-lg w-96">
        <h1 className="text-2xl font-bold mb-4">Get answers to all your questions.</h1>
        <p className="text-lg text-gray-700 mb-6">
          Problems trying to resolve the conflict between the two major realms of Classical physics:
        </p>
        <button className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 mb-6">
          Contact Our Company
        </button>
        
        <div className="flex justify-center space-x-4">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter size={30} className="text-blue-500 hover:text-blue-700" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF size={30} className="text-blue-700 hover:text-blue-900" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={30} className="text-pink-500 hover:text-pink-700" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn size={30} className="text-blue-600 hover:text-blue-800" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
