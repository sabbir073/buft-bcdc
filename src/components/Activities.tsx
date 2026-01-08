import Image from "next/image";
import Link from "next/link";

interface Activity {
  id: number;
  title: string;
  description: string;
  date: string;
  images: string[];
  imageCount: number;
}

async function getFeaturedActivities(): Promise<Activity[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://buftcdc.com';
    const response = await fetch(`${baseUrl}/api/public/activities?featured=true&limit=3&offset=0`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch activities');
    }

    const data = await response.json();
    // Handle both old and new response formats
    return Array.isArray(data) ? data.slice(0, 3) : (data.activities || []).slice(0, 3);
  } catch (error) {
    console.error('Error fetching featured activities:', error);
    return [];
  }
}

// Activity Card component
function ActivityCard({
  activity,
}: {
  activity: Activity;
}) {
  const truncateDescription = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + "...";
  };

  return (
    <Link
      href={`/activities/${activity.id}`}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-2 block"
    >
      {/* Main Image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={activity.images[0]}
          alt={activity.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="text-white flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            <span className="font-medium">View Details</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Date */}
        <div className="flex items-center gap-2 text-blue-600 text-sm font-medium mb-3">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          {activity.date}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {activity.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {truncateDescription(activity.description)}
        </p>

        {/* Gallery Thumbnail */}
        <div className="flex items-center gap-3">
          {/* Stacked thumbnails */}
          <div className="flex -space-x-3">
            {activity.images.slice(0, 3).map((img, idx) => (
              <div
                key={idx}
                className="w-10 h-10 rounded-lg overflow-hidden border-2 border-white shadow-sm"
                style={{ zIndex: 3 - idx }}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          {/* Image count badge */}
          <div className="flex items-center gap-1 text-blue-600 font-medium text-sm">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>{activity.imageCount} photos</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default async function Activities() {
  const featuredActivities = await getFeaturedActivities();

  return (
    <section
      id="activities"
      className="py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">
            Featured Activities
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our highlighted events and programs designed to help you
            build skills, expand your network, and accelerate your career
            growth.
          </p>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mt-4" />
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredActivities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
            />
          ))}
        </div>

        {/* See More Button */}
        <div className="text-center">
          <Link
            href="/activities"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl group"
          >
            <span>See All Activities</span>
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
