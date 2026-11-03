<x-mail::message>
# Application submitted

Hi {{ $application->expertProfile->user->name }},

Your application for **{{ $application->project->title }}** has been sent successfully. The company can now review your application and CV or resume.

You can track its status in the **My Applications** section of your ElderExpert account.

Thanks,<br>
The ElderExpert team
</x-mail::message>
