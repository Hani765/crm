<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Services>
 */
class ServicesfactoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $categories = [
            ['name' => 'Electronics Repair', 'icon' => 'FaTv', 'description' => 'Repair and maintain electronics like TVs, radios, and gadgets.'],
            ['name' => 'Fashion Design', 'icon' => 'FaTshirt', 'description' => 'Design clothing and accessories for all fashion types.'],
            ['name' => 'Home Cleaning', 'icon' => 'FaBroom', 'description' => 'Professional cleaning for homes and residential properties.'],
            ['name' => 'Plumbing Services', 'icon' => 'FaShower', 'description' => 'Install and repair plumbing systems, pipes, and fixtures.'],
            ['name' => 'Electrical Services', 'icon' => 'FaPlug', 'description' => 'Electrical installations, repairs, and wiring services.'],
            ['name' => 'Gardening Services', 'icon' => 'FaTree', 'description' => 'Garden maintenance and landscaping services.'],
            ['name' => 'Cooking Services', 'icon' => 'FaUtensils', 'description' => 'Provide cooking services for events, homes, and businesses.'],
            ['name' => 'Pet Care', 'icon' => 'FaPaw', 'description' => 'Pet grooming, care, and walking services.'],
            ['name' => 'Transportation', 'icon' => 'FaCar', 'description' => 'Provide transportation services like ride-sharing and vehicle rentals.'],
            ['name' => 'Laundry Services', 'icon' => 'FaTshirt', 'description' => 'Wash, dry, and fold laundry for individuals and businesses.'],
            ['name' => 'Beauty Services', 'icon' => 'FaMagic', 'description' => 'Beauty treatments, makeup, and personal grooming.'],
            ['name' => 'Fitness Training', 'icon' => 'FaDumbbell', 'description' => 'Personal training for fitness and weight loss goals.'],
            ['name' => 'Carpentry Services', 'icon' => 'FaHammer', 'description' => 'Custom carpentry work, from furniture to installations.'],
            ['name' => 'House Painting', 'icon' => 'FaPaintBrush', 'description' => 'Interior and exterior painting services for homes and offices.'],
            ['name' => 'Interior Design', 'icon' => 'FaCouch', 'description' => 'Design and decorate interior spaces for aesthetic appeal.'],
            ['name' => 'Legal Services', 'icon' => 'FaGavel', 'description' => 'Legal consultation, representation, and document services.'],
            ['name' => 'Medical Services', 'icon' => 'FaStethoscope', 'description' => 'Healthcare services, consultations, and treatments.'],
            ['name' => 'Event Planning', 'icon' => 'FaCalendarCheck', 'description' => 'Plan and organize events, from weddings to corporate gatherings.'],
            ['name' => 'Photography', 'icon' => 'FaCamera', 'description' => 'Professional photography for events, portraits, and more.'],
            ['name' => 'Web Development', 'icon' => 'FaLaptopCode', 'description' => 'Design and develop websites and web applications.'],
            ['name' => 'App Development', 'icon' => 'FaMobileAlt', 'description' => 'Design and develop mobile applications for businesses and consumers.'],
            ['name' => 'Digital Marketing', 'icon' => 'FaBullhorn', 'description' => 'Marketing strategies to promote products and services online.'],
            ['name' => 'Translation Services', 'icon' => 'FaLanguage', 'description' => 'Language translation for documents, websites, and more.'],
            ['name' => 'Accounting Services', 'icon' => 'FaCalculator', 'description' => 'Provide accounting, bookkeeping, and tax filing services.'],
            ['name' => 'Insurance Services', 'icon' => 'FaShieldAlt', 'description' => 'Offer various insurance options for personal and business needs.'],
            ['name' => 'Construction Services', 'icon' => 'FaBuilding', 'description' => 'Construction work including building, renovation, and maintenance.'],
            ['name' => 'Security Services', 'icon' => 'FaShieldAlt', 'description' => 'Provide security personnel and surveillance services.'],
            ['name' => 'Taxi Services', 'icon' => 'FaTaxi', 'description' => 'Transportation services for individuals and groups.'],
            ['name' => 'Tech Support', 'icon' => 'FaHeadset', 'description' => 'Assist with technology issues including hardware and software.'],
            ['name' => 'Tutoring Services', 'icon' => 'FaChalkboardTeacher', 'description' => 'Provide tutoring for students in various subjects.'],
            ['name' => 'Courier Services', 'icon' => 'FaTruck', 'description' => 'Fast and reliable delivery services for documents and packages.'],
            ['name' => 'Personal Shopper', 'icon' => 'FaShoppingBag', 'description' => 'Assist with shopping for clothing, groceries, and gifts.'],
            ['name' => 'Social Media Management', 'icon' => 'FaUsers', 'description' => 'Manage social media accounts for businesses and influencers.'],
            ['name' => 'Home Renovation', 'icon' => 'FaWrench', 'description' => 'Renovation services for homes and offices.'],
            ['name' => 'Cleaning Services', 'icon' => 'FaBroom', 'description' => 'House and office cleaning services.'],
            ['name' => 'Personal Assistant', 'icon' => 'FaUserTie', 'description' => 'Administrative support for personal or business tasks.'],
            ['name' => 'Childcare Services', 'icon' => 'FaChild', 'description' => 'Care for children, including daycare and babysitting.'],
            ['name' => 'Senior Care', 'icon' => 'FaHeart', 'description' => 'Elderly care services including companionship and medical assistance.'],
            ['name' => 'Financial Planning', 'icon' => 'FaMoneyBillAlt', 'description' => 'Offer financial advisory and planning services.'],
            ['name' => 'SEO Services', 'icon' => 'FaSearch', 'description' => 'Search engine optimization to improve website rankings.'],
            ['name' => 'Content Writing', 'icon' => 'FaPencilAlt', 'description' => 'Content creation for websites, blogs, and marketing.'],
            ['name' => 'Virtual Assistant', 'icon' => 'FaLaptop', 'description' => 'Provide remote administrative and organizational support.'],
            ['name' => 'Massage Therapy', 'icon' => 'FaHandsHelping', 'description' => 'Massage and therapy services for relaxation and pain relief.'],
            ['name' => 'Moving Services', 'icon' => 'FaTruckMoving', 'description' => 'Help with packing, moving, and transporting belongings.'],
            ['name' => 'Home Security', 'icon' => 'FaLock', 'description' => 'Install and maintain security systems for homes and businesses.'],
            ['name' => 'Roofing Services', 'icon' => 'FaArrowUp', 'description' => 'Roof repairs and installations for homes and businesses.'],
            ['name' => 'Voiceover Services', 'icon' => 'FaMicrophone', 'description' => 'Provide professional voiceover services for videos and ads.'],
            ['name' => 'Interior Cleaning', 'icon' => 'FaSponge', 'description' => 'Deep cleaning services for interior spaces.'],
            ['name' => 'Travel Services', 'icon' => 'FaPlane', 'description' => 'Offer travel arrangements, bookings, and tours.'],
            ['name' => 'Tech Setup', 'icon' => 'FaTools', 'description' => 'Setup tech equipment including computers, cameras, and software.'],
            ['name' => 'Car Detailing', 'icon' => 'FaCar', 'description' => 'Detail and clean vehicles inside and out.'],
        ];

        $category = $this->faker->unique()->randomElement($categories);

        return [
            'unique_id' => Str::uuid()->toString(),
            'name' => $category['name'],
            'url' => $this->faker->slug(),
            'description' => $category['description'],
            'icon' => $category['icon'],
        ];
    }
}
