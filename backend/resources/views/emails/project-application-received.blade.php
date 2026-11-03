<x-mail::message>
# A new application is waiting

Hi {{ $application->project->companyProfile->company_name }},

**{{ $application->expertProfile->user->name }}** has applied to **{{ $application->project->title }}**.

{{ $application->expertProfile->professional_title }}

The expert’s cover letter and CV or resume are ready for review in the **Applications** section of your ElderExpert company portal.

Thanks,<br>
The ElderExpert team
</x-mail::message>
