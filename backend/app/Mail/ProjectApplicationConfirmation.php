<?php

namespace App\Mail;

use App\Models\ProjectApplication;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ProjectApplicationConfirmation extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public ProjectApplication $application)
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(subject: 'Your ElderExpert project application was submitted');
    }

    public function content(): Content
    {
        return new Content(markdown: 'emails.project-application-confirmation');
    }
}
