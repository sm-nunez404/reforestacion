interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon?: React.ReactNode;
}

export default function StatsCard({ title, value, change, icon }: StatsCardProps) {
  const isPositiveChange = change.startsWith('+');
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {icon && (
            <div className="p-2 bg-green-100 rounded-lg mr-4">
              {icon}
            </div>
          )}
          <div>
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            <div className="flex items-baseline mt-1">
              <p className="text-2xl font-semibold text-gray-900">{value}</p>
              <span className={`ml-2 text-sm font-medium ${
                isPositiveChange ? 'text-green-600' : 'text-red-600'
              }`}>
                {change}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
