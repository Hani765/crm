<?php
// database/factories/ComplaintFactory.php

namespace Database\Factories;

use App\Models\Complaint;
use App\Models\User;
use App\Models\Brand;
use App\Models\Branch;
use App\Models\Branches;
use App\Models\Brands;
use Illuminate\Database\Eloquent\Factories\Factory;

class ComplaintFactory extends Factory
{
    protected $model = Complaint::class; // Set the model this factory is for
    protected $statusOptions = [
        ["value" => "active", "label" => "Active"],
        ["value" => "inactive", "label" => "Inactive"],
        ["value" => "paused", "label" => "Paused"],
        ["value" => "open", "label" => "Open"],
        ["value" => "part-demand", "label" => "Part Demand"],
        ["value" => "service-lifting", "label" => "Service Lifting"],
        ["value" => "party-lifting", "label" => "Party Lifting"],
        ["value" => "unit-in-service-center", "label" => "Unit in service center"],
        ["value" => "installation-pending", "label" => "Installation Pending"],
        ["value" => "in-progress", "label" => "In Process"],
        ["value" => "deliverd", "label" => "Deliverd"],
        ["value" => "completed", "label" => "Completed"],
        ["value" => "cancelled", "label" => "Cancelled"],
        ["value" => "closed", "label" => "Closed"],
    ];
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => User::inRandomOrder()->first()->unique_id,
            'complain_num' => $this->faker->unique()->numerify('COM-####'),
            'brand_id' => Brands::inRandomOrder()->first()->unique_id,
            'branch_id' => Branches::inRandomOrder()->first()->unique_id,
            'contact_name' => $this->faker->name,
            'company_complaint_no' => $this->faker->optional()->numerify('C-#####'),
            'contact_email' => $this->faker->optional()->safeEmail(),
            'phone_no' => $this->faker->phoneNumber,
            'whatsapp_no' => $this->faker->optional()->phoneNumber(),
            'address' => $this->faker->address,
            'city' => $this->faker->city,
            'product' => $this->faker->word,
            'sender' => $this->faker->word,
            'provided_services' => $this->faker->word,
            'model' => $this->faker->word,
            'serial_number_ind' => $this->faker->optional()->word,
            'serial_number_oud' => $this->faker->optional()->word,
            'mq_nmb' => $this->faker->optional()->word,
            'p_date' => $this->faker->optional()->date(),
            'complete_date' => $this->faker->optional()->date(),
            'description' => $this->faker->optional()->paragraph,
            'amount' => $this->faker->optional()->randomNumber(3),
            'technician' => $this->faker->optional()->name,
            'status' => $this->faker->randomElement(array_column($this->statusOptions, 'value')), // Random status value
            'complaint_type' => $this->faker->randomElement(['repair', 'service', 'installation']),
            'extra' => $this->faker->optional()->paragraph,
            'images' => $this->faker->optional()->imageUrl(),
        ];
    }
}
