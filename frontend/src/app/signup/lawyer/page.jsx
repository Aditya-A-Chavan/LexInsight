'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';

// Step components
const PersonalInfo = ({ register, errors }) => (
    <div className="space-y-4">
        <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
                {...register("name", { required: "Name is required" })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
                type="email"
                {...register("email", {
                    required: "Email is required",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                    }
                })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
                type="password"
                {...register("password", {
                    required: "Password is required",
                    minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters"
                    }
                })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
                type="tel"
                {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Please enter a valid 10-digit phone number"
                    }
                })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700">Registration Number</label>
            <input
                {...register("bar_registration_number", { required: "Registration number is required" })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.bar_registration_number && <p className="mt-1 text-sm text-red-600">{errors.bar_registration_number.message}</p>}
        </div>
    </div>
);

const ProfessionalInfo = ({ register, errors }) => (
    <div className="space-y-4">
        <div>
            <label className="block text-sm font-medium text-gray-700">Education</label>
            <textarea
                {...register("education", { required: "Education details are required" })}
                rows={3}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="List your educational qualifications..."
            />
            {errors.education && <p className="mt-1 text-sm text-red-600">{errors.education.message}</p>}
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700">Experience (in years)</label>
            <input
                type="number"
                {...register("experience_in_years", {
                    required: "Experience is required",
                    min: { value: 0, message: "Experience cannot be negative" }
                })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.experience_in_years && <p className="mt-1 text-sm text-red-600">{errors.experience_in_years.message}</p>}
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Practice Areas</label>
            <div className="grid grid-cols-2 gap-2">
                {[
                    'Corporate', 'Criminal', 'Real Estate', 'Employment',
                    'Intellectual Property', 'Tax', 'Technology',
                    'Government Regulatory', 'Labour', 'Family',
                    'Emigration', 'Litigation', 'Bank Corruption',
                    'Environmental Law'
                ].map((area) => (
                    <div key={area} className="flex items-center">
                        <input
                            type="checkbox"
                            id={area.toLowerCase().replace(/\s+/g, '_')}
                            value={area}
                            {...register("practice_area", { required: "At least one practice area is required" })}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor={area.toLowerCase().replace(/\s+/g, '_')} className="ml-2 block text-sm text-gray-700">
                            {area}
                        </label>
                    </div>
                ))}
            </div>
            {errors.practice_area && <p className="mt-1 text-sm text-red-600">{errors.practice_area.message}</p>}
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700">Specialization</label>
            <input
                {...register("specialization", { required: "Specialization is required" })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.specialization && <p className="mt-1 text-sm text-red-600">{errors.specialization.message}</p>}
        </div>
    </div>
);

const AdditionalInfo = ({ register, errors, watch }) => {
    const profilePicture = watch('profilePicture');

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea
                    {...register("bio")}
                    rows={4}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Tell us about yourself..."
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Availability</label>
                <input
                    {...register("availability")}
                    placeholder="e.g., Mon-Fri, 9 AM - 5 PM"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Awards & Recognition</label>
                <textarea
                    {...register("awards")}
                    rows={3}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="List your awards and recognition..."
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Corporate Clients</label>
                <textarea
                    {...register("corporate_clients")}
                    rows={3}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="List your major corporate clients..."
                />
            </div>
        </div>
    );
};

const LocationInfo = ({ register, errors }) => (
    <div className="space-y-4">
        <div>
            <label className="block text-sm font-medium text-gray-700">Courts Practiced</label>
            <textarea
                {...register("courtpracticed", { required: "Courts practiced is required" })}
                rows={3}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="List the courts you've practiced in..."
            />
            {errors.courtpracticed && <p className="mt-1 text-sm text-red-600">{errors.courtpracticed.message}</p>}
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700">Pincode</label>
            <input
                {...register("pincode", {
                    required: "Pincode is required",
                    pattern: {
                        value: /^[0-9]{6}$/,
                        message: "Please enter a valid 6-digit pincode"
                    }
                })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.pincode && <p className="mt-1 text-sm text-red-600">{errors.pincode.message}</p>}
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700">Social Media Links</label>
            <div className="space-y-2">
                <input
                    {...register("socialMediaLinks.linkedin")}
                    placeholder="LinkedIn URL"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <input
                    {...register("socialMediaLinks.twitter")}
                    placeholder="Twitter URL"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>
        </div>
    </div>
);

const steps = [
    { title: "Personal Information", component: PersonalInfo },
    { title: "Professional Details", component: ProfessionalInfo },
    { title: "Additional Information", component: AdditionalInfo },
    { title: "Location & Contact", component: LocationInfo },
];

export default function LawyerSignup() {
    const [currentStep, setCurrentStep] = useState(0);
    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        mode: "onChange"
    });

    const onSubmit = async (data) => {
        try {
            data["social_media_links"] = data.socialMediaLinks.linkedin + "," + data.socialMediaLinks.twitter;
            data["experience"] = data.experience_in_years;
            data["about_me"] = data.bio;
            data["newzletter"] = false;
            data["profile_picture"] = "https://i.pravatar.cc/300"
            data["interests"] = [];
            data["username"] = data.name + " " + data.bar_registration_number;
            data["rating"] = 0;
            console.log(data);
            // Here you would integrate with your backend API
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/registerLawyer`, data);

            if (!response.status === 200) {
                throw new Error('Signup failed');
            }

            // Redirect to login page after successful signup
            router.push('/login');
        } catch (error) {
            console.error('Error during signup:', error);
        }
    };

    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

    const CurrentStepComponent = steps[currentStep].component;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Lawyer Registration
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="flex justify-between mb-2">
                            {steps.map((step, index) => (
                                <div
                                    key={index}
                                    className={`flex-1 text-center text-xs ${index <= currentStep ? 'text-blue-600' : 'text-gray-400'
                                        }`}
                                >
                                    {step.title}
                                </div>
                            ))}
                        </div>
                        <div className="relative pt-1">
                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                                <div
                                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                                    style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CurrentStepComponent register={register} errors={errors} watch={watch} />

                        <div className="mt-6 flex justify-between">
                            {currentStep > 0 && (
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Previous
                                </button>
                            )}
                            {currentStep < steps.length - 1 ? (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Next
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Submit
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
} 