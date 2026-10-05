<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

#[Fillable(['name', 'email', 'password','role'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // One user can have one expert profile
    public function expertProfile()
    {
        return $this->hasOne(ExpertProfile::class);
    }

    // One user can have one company profile
    public function companyProfile()
    {
        return $this->hasOne(CompanyProfile::class);
    }

    // One user can have one young professional profile
    public function youngProfessionalProfile()
    {
        return $this->hasOne(YoungProfessionalProfile::class);
    }

    // One user can have many bookings
    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    // Messages sent by this user
    public function sentMessages()
    {
        return $this->hasMany(Message::class, 'sender_id');
    }

    // Messages received by this user
    public function receivedMessages()
    {
        return $this->hasMany(Message::class, 'receiver_id');
    }

    // One user can have many notifications
    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }

    // One user can write many reviews
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}
