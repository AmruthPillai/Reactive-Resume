type Statistic = {
  name: string;
  value: string;
};

const stats: Statistic[] = [
  { name: 'GitHub Stars', value: '11,800+' },
  { name: 'Users Signed Up', value: '300,000+' },
  { name: 'Resumes Generated', value: '400,000+' },
];

const StatsSection = () => (
  <section className="relative py-24 sm:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
        {stats.map((stat, index) => (
          <div key={index} className="mx-auto flex max-w-xs flex-col gap-y-4">
            <dt className="text-base leading-7 opacity-60">{stat.name}</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight sm:text-5xl">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);

export default StatsSection;
