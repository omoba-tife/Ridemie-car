
import { useState } from "react";
import {
  Image, Plus, Megaphone, Trash2, Power, X, Edit3,
  Eye, EyeOff
} from "lucide-react";

const initialBanners = [
  {
    id: 1,
    title: "Experience Premium Mobility",
    subtitle: "Discover exceptional vehicles for every journey.",
    placement: "Homepage Hero",
    status: "Published",
  },
  {
    id: 2,
    title: "Become a RideMie Partner",
    subtitle: "Earn with your vehicle through our partner network.",
    placement: "Partner Promotion",
    status: "Published",
  },
];

const initialAnnouncements = [
  {
    id: 1,
    title: "Welcome to RideMie",
    message: "Enjoy a premium car rental experience with RideMie.",
    status: "Active",
  },
];

export default function AdminContent() {
  const [banners, setBanners] = useState(initialBanners);
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [showBannerForm, setShowBannerForm] = useState(false);
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);
  const [bannerForm, setBannerForm] = useState({
    title: "",
    subtitle: "",
    placement: "Homepage Hero",
  });
  const [announcementForm, setAnnouncementForm] = useState({
    title: "",
    message: "",
  });

  const createBanner = (e) => {
    e.preventDefault();

    setBanners((prev) => [{
      id: Date.now(),
      ...bannerForm,
      status: "Published",
    }, ...prev]);

    setBannerForm({
      title: "",
      subtitle: "",
      placement: "Homepage Hero",
    });
    setShowBannerForm(false);
  };

  const createAnnouncement = (e) => {
    e.preventDefault();

    setAnnouncements((prev) => [{
      id: Date.now(),
      ...announcementForm,
      status: "Active",
    }, ...prev]);

    setAnnouncementForm({ title: "", message: "" });
    setShowAnnouncementForm(false);
  };

  const toggleBanner = (id) => {
    setBanners((prev) => prev.map((item) =>
      item.id === id
        ? { ...item, status: item.status === "Published" ? "Hidden" : "Published" }
        : item
    ));
  };

  const toggleAnnouncement = (id) => {
    setAnnouncements((prev) => prev.map((item) =>
      item.id === id
        ? { ...item, status: item.status === "Active" ? "Inactive" : "Active" }
        : item
    ));
  };

  const deleteItem = (setter, id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setter((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="min-h-screen space-y-8 bg-slate-100 p-4 md:p-8">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-amber-600">
          Website management
        </p>
        <h1 className="mt-2 text-3xl font-black text-slate-900">
          Website Content
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Manage promotional banners and platform announcements.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total Banners", value: banners.length, icon: Image },
          { label: "Published Banners", value: banners.filter((b) => b.status === "Published").length, icon: Eye },
          { label: "Announcements", value: announcements.length, icon: Megaphone },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">{stat.label}</p>
              <stat.icon size={20} className="text-amber-500" />
            </div>
            <p className="mt-3 text-3xl font-black text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-black text-slate-900">Homepage Banners</h2>
            <p className="mt-1 text-sm text-slate-500">Manage promotional website sections.</p>
          </div>
          <button onClick={() => setShowBannerForm(true)} className="flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white">
            <Plus size={17} /> Add Banner
          </button>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {banners.map((banner) => (
            <div key={banner.id} className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <Image size={23} />
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${banner.status === "Published" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"}`}>
                  {banner.status}
                </span>
              </div>

              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-amber-600">{banner.placement}</p>
              <h3 className="mt-2 text-lg font-black text-slate-900">{banner.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{banner.subtitle}</p>

              <div className="mt-5 flex gap-2 border-t border-slate-100 pt-4">
                <button onClick={() => toggleBanner(banner.id)} className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700">
                  {banner.status === "Published" ? <EyeOff size={15} /> : <Eye size={15} />}
                  {banner.status === "Published" ? "Hide" : "Publish"}
                </button>
                <button onClick={() => deleteItem(setBanners, banner.id)} className="rounded-lg bg-red-50 p-2 text-red-600">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          {banners.length === 0 && <p className="rounded-xl bg-white p-8 text-center text-sm text-slate-500">No banners created yet.</p>}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-black text-slate-900">Announcements</h2>
            <p className="mt-1 text-sm text-slate-500">Messages for your customers and platform users.</p>
          </div>
          <button onClick={() => setShowAnnouncementForm(true)} className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-800">
            <Plus size={17} /> Add Announcement
          </button>
        </div>

        <div className="space-y-3">
          {announcements.map((item) => (
            <div key={item.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                  <Megaphone size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{item.message}</p>
                  <span className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-bold ${item.status === "Active" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"}`}>
                    {item.status}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button onClick={() => toggleAnnouncement(item.id)} className="rounded-lg bg-slate-100 p-2.5 text-slate-600">
                  <Power size={16} />
                </button>
                <button onClick={() => deleteItem(setAnnouncements, item.id)} className="rounded-lg bg-red-50 p-2.5 text-red-600">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          {announcements.length === 0 && <p className="rounded-xl bg-white p-8 text-center text-sm text-slate-500">No announcements created yet.</p>}
        </div>
      </section>

      {showBannerForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <form onSubmit={createBanner} className="w-full max-w-lg space-y-4 rounded-2xl bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black">Create Banner</h2>
              <button type="button" onClick={() => setShowBannerForm(false)}><X /></button>
            </div>
            <input required placeholder="Banner headline" value={bannerForm.title} onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })} className="w-full rounded-xl border p-3 text-sm" />
            <textarea required rows="3" placeholder="Banner description" value={bannerForm.subtitle} onChange={(e) => setBannerForm({ ...bannerForm, subtitle: e.target.value })} className="w-full rounded-xl border p-3 text-sm" />
            <select value={bannerForm.placement} onChange={(e) => setBannerForm({ ...bannerForm, placement: e.target.value })} className="w-full rounded-xl border p-3 text-sm">
              <option>Homepage Hero</option>
              <option>Fleet Promotion</option>
              <option>Partner Promotion</option>
              <option>Services Promotion</option>
            </select>
            <button className="w-full rounded-xl bg-slate-950 py-3 font-bold text-white">Create Banner</button>
          </form>
        </div>
      )}

      {showAnnouncementForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <form onSubmit={createAnnouncement} className="w-full max-w-lg space-y-4 rounded-2xl bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black">Create Announcement</h2>
              <button type="button" onClick={() => setShowAnnouncementForm(false)}><X /></button>
            </div>
            <input required placeholder="Announcement title" value={announcementForm.title} onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })} className="w-full rounded-xl border p-3 text-sm" />
            <textarea required rows="4" placeholder="Write your announcement..." value={announcementForm.message} onChange={(e) => setAnnouncementForm({ ...announcementForm, message: e.target.value })} className="w-full rounded-xl border p-3 text-sm" />
            <button className="w-full rounded-xl bg-slate-950 py-3 font-bold text-white">Publish Announcement</button>
          </form>
        </div>
      )}
    </div>
  );
}
