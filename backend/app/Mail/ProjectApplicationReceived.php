<?php

namespace App\Mail;

use App\Models\ProjectApplication;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ProjectApplicationReceived extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public ProjectApplication $application)
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(subject: 'A new expert applied to your ElderExpert project');
    }

    public function content(): Content
    {
        return new Content(markdown: 'emails.project-application-received');
    }
}
