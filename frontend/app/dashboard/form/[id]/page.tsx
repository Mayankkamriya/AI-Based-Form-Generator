'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { CheckCircle, Send, FileText } from 'lucide-react';
import api from '@/app/utils/api';

interface FormField {
  name: string;
  type: string;
  label: string;
  required?: boolean;
  validation?: {
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: string;
  };
}

interface FormSchema {
  title: string;
  description: string;
  fields: FormField[];
}

interface FormData {
  [key: string]: string | number | File[];
}

export default function FormPage() {
  const params = useParams();
  const formId = params.id as string;

  const [formSchema, setFormSchema] = useState<FormSchema | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [files, setFiles] = useState<{ [key: string]: File[] }>({});

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  // Fetch form schema
  useEffect(() => {
    fetchFormSchema();
  }, [formId]);

  const fetchFormSchema = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/form/${formId}`);
      setFormSchema(response.data.form.formSchema);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || 'Failed to load form');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (fieldName: string, event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles((prev) => ({
        ...prev,
        [fieldName]: Array.from(event.target.files!),
      }));
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      setError('');
      setSuccess(false);

      const formData = new FormData();

      // Collect responses into a single object
      const responses: Record<string, string | number> = {};
      Object.keys(data).forEach((key) => {
        if (data[key] !== undefined && data[key] !== '') {
          responses[key] = data[key] as string | number;
        }
      });

      // Append responses JSON
      formData.append('responses', JSON.stringify(responses));

      // Append files
      Object.keys(files).forEach((fieldName) => {
        if (files[fieldName] && files[fieldName].length > 0) {
          files[fieldName].forEach((file) => {
            formData.append(fieldName, file);
          });
        }
      });

      // Submit to backend
      await api.post(`/submission/${formId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Show success and reset form
      setSuccess(true);
      reset();
      setFiles({});
      
      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Hide success message after 8 seconds
      setTimeout(() => setSuccess(false), 8000);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || 'Failed to submit form');
      // Scroll to top to show error message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: FormField) => {
    const fieldName = field.name;
    const isRequired = field.required;
    const validation = field.validation || {};

    switch (field.type) {
      case 'text':
      case 'email':
        return (
          <input
            {...register(fieldName, {
              required: isRequired ? `${field.label} is required` : false,
              minLength: validation.minLength
                ? {
                    value: validation.minLength,
                    message: `${field.label} must be at least ${validation.minLength} characters`,
                  }
                : undefined,
              maxLength: validation.maxLength
                ? {
                    value: validation.maxLength,
                    message: `${field.label} must be no more than ${validation.maxLength} characters`,
                  }
                : undefined,
              pattern:
                field.type === 'email'
                  ? {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Please enter a valid email address',
                    }
                  : validation.pattern
                  ? {
                      value: new RegExp(validation.pattern),
                      message: `${field.label} format is invalid`,
                    }
                  : undefined,
            })}
            type={field.type}
            id={fieldName}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
            placeholder={`Enter ${field.label.toLowerCase()}`}
          />
        );

      case 'number':
        return (
          <input
            {...register(fieldName, {
              required: isRequired ? `${field.label} is required` : false,
              min: validation.min
                ? {
                    value: validation.min,
                    message: `${field.label} must be at least ${validation.min}`,
                  }
                : undefined,
              max: validation.max
                ? {
                    value: validation.max,
                    message: `${field.label} must be no more than ${validation.max}`,
                  }
                : undefined,
            })}
            type="number"
            id={fieldName}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
            placeholder={`Enter ${field.label.toLowerCase()}`}
          />
        );

      case 'file':
        return (
          <div className="space-y-3">
            <input
              type="file"
              id={fieldName}
              multiple
              onChange={(e) => handleFileChange(fieldName, e)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
              accept="image/*,.pdf,.doc,.docx,.txt"
            />
            {files[fieldName] && files[fieldName].length > 0 && (
              <div className="flex flex-wrap gap-2">
                {files[fieldName].map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 bg-green-50 text-green-700 px-3 py-2 rounded-lg text-sm"
                  >
                    <FileText className="w-4 h-4" />
                    <span>{file.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'textarea':
        return (
          <textarea
            {...register(fieldName, {
              required: isRequired ? `${field.label} is required` : false,
              minLength: validation.minLength
                ? {
                    value: validation.minLength,
                    message: `${field.label} must be at least ${validation.minLength} characters`,
                  }
                : undefined,
              maxLength: validation.maxLength
                ? {
                    value: validation.maxLength,
                    message: `${field.label} must be no more than ${validation.maxLength} characters`,
                  }
                : undefined,
            })}
            id={fieldName}
            rows={4}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none"
            placeholder={`Enter ${field.label.toLowerCase()}`}
          />
        );

      default:
        return (
          <input
            {...register(fieldName, {
              required: isRequired ? `${field.label} is required` : false,
            })}
            type="text"
            id={fieldName}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
            placeholder={`Enter ${field.label.toLowerCase()}`}
          />
        );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading form...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !formSchema) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl text-center">
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!formSchema) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600">Form not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Form Header */}
        <div className="text-center mb-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {formSchema.title}
            </h1>
            {formSchema.description && (
              <p className="text-lg text-gray-600 leading-relaxed">
                {formSchema.description}
              </p>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-400 text-red-800 px-8 py-6 rounded-2xl shadow-lg">
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="bg-red-500 rounded-full p-3">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div className="text-center">
                <p className="font-bold text-xl mb-1">Submission Failed</p>
                <p className="text-base text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-400 text-green-800 px-8 py-6 rounded-2xl shadow-lg animate-pulse">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="bg-green-500 rounded-full p-3">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <div className="text-center">
                <p className="font-bold text-2xl mb-2">
                  ✅ Form Submitted Successfully!
                </p>
                <p className="text-base text-green-700">
                  Thank you! Your response has been recorded.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {formSchema.fields.map((field) => (
              <div key={field.name} className="space-y-3">
                <label
                  htmlFor={field.name}
                  className="block text-lg font-semibold text-gray-900"
                >
                  {field.label}
                  {field.required && (
                    <span className="text-red-500 ml-2">*</span>
                  )}
                </label>

                <div>{renderField(field)}</div>

                {errors[field.name] && (
                  <p className="text-sm text-red-600 mt-2">
                    {errors[field.name]?.message}
                  </p>
                )}
              </div>
            ))}

            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3"
              >
                <Send className="w-5 h-5" />
                <span>{isSubmitting ? 'Submitting...' : 'Submit Form'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
