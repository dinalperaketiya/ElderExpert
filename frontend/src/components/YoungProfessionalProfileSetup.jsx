import React, { useState } from 'react';
import { ArrowRight, Camera, MapPin, Sparkles, Upload } from 'lucide-react';
import { youngProfessionalProfileApi } from '../services/api';
import './YoungProfessionalPortal.css';

export default function YoungProfessionalProfileSetup({ profile, onComplete, onLogout }) {
  const [form, setForm] = useState(() => ({ professional_title: profile?.professional_title || '', bio: profile?.bio || '', location: profile?.location || '' }));
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(profile?.profile_photo || '');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const update = (event) => { setForm((current) => ({ ...current, [event.target.name]: event.target.value })); setError(''); };
  const choosePhoto = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/') || file.size > 5 * 1024 * 1024) { setError('Choose a JPG, PNG, or WebP image smaller than 5 MB.'); return; }
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };
  const submit = async (event) => {
    event.preventDefault(); setSaving(true); setError('');
    try {
      const payload = new FormData();
      Object.entries(form).forEach(([key, value]) => payload.append(key, value));
      if (photo) payload.append('profile_photo', photo);
      const { data } = profile?.id ? await youngProfessionalProfileApi.update(profile.id, payload) : await youngProfessionalProfileApi.create(payload);
      onComplete(data.data);
    } catch (requestError) {
      const validation = requestError.response?.data?.errors;
      setError(validation ? Object.values(validation).flat()[0] : requestError.response?.data?.message || 'We couldn’t save your profile. Please try again.');
    } finally { setSaving(false); }
  };

  return (
    <main className="yp-setup">
      <header className="yp-setup__top"><a className="yp-brand" href="#profile"><span className="yp-brand__mark">✦</span><span><b>ElderExpert</b><small>YOUNG PROFESSIONAL PORTAL</small></span></a><button onClick={onLogout} type="button">Sign out</button></header>
      <section className="yp-setup__card"><div className="yp-setup__intro"><span className="yp-eyebrow"><Sparkles size={14}/> BUILD YOUR PROFESSIONAL PRESENCE</span><h1>{profile ? 'Update your profile' : 'Create your profile'}</h1><p>Introduce yourself and tell experienced professionals what you’re working toward.</p></div>
        <form className="yp-setup__form" onSubmit={submit}>
          <div className="yp-setup__photo"><span className="yp-setup__photo-preview">{preview ? <img src={preview} alt="Profile preview"/> : <Camera size={22}/>}</span><div><b>Profile photo <i>Optional</i></b><small>Add a photo so mentors can put a face to your name.</small><label className="yp-setup__choose"><Upload size={15}/> {preview ? 'Change photo' : 'Choose from device'}<input accept="image/png,image/jpeg,image/webp" onChange={choosePhoto} type="file"/></label></div></div>
          <label className="yp-setup__field"><span>Your current role or study area <em>*</em></span><input maxLength={255} name="professional_title" onChange={update} placeholder="e.g. Undergraduate student in Computer Science" required value={form.professional_title}/></label>
          <label className="yp-setup__field"><span>About you <em>*</em></span><textarea maxLength={2000} name="bio" onChange={update} placeholder="Tell mentors about your interests, experience, and what you hope to learn…" required rows={5} value={form.bio}/><small>{form.bio.length}/2000</small></label>
          <label className="yp-setup__field"><span>Location</span><span className="yp-setup__location"><MapPin size={17}/><input maxLength={255} name="location" onChange={update} placeholder="City, country" value={form.location}/></span></label>
          {error && <p className="yp-setup__error" role="alert">{error}</p>}
          <button className="yp-setup__submit" disabled={saving} type="submit">{saving ? 'Saving profile…' : profile ? 'Save profile changes' : 'Create my profile'} {!saving && <ArrowRight size={17}/>}</button>
          <p className="yp-setup__privacy">You can edit your profile details at any time.</p>
        </form>
      </section>
    </main>
  );
}
