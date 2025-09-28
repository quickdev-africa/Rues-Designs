// Deleted: QuickStartGuide (enhanced backend setup panel)
                  : 'bg-gray-200 text-gray-600'
            }`}>
              {stepItem.completed ? '✓' : index + 1}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`font-medium ${stepItem.completed ? 'text-green-800' : 'text-gray-900'}`}>
                    {stepItem.title}
                  </h4>
                  <p className="text-sm text-gray-600">{stepItem.description}</p>
                </div>
                <span className="text-xs text-gray-500">{stepItem.action}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!completed.migration && (
        <div className="mt-4 p-3 bg-blue-100 rounded-md">
          <p className="text-sm text-blue-800">
            <strong>Next:</strong> {
              !completed.env ? "Set up your .env.local file with Supabase credentials" :
              !completed.database ? "Run the database schema in Supabase SQL Editor" :
              "Use the integration panel to complete setup"
            }
          </p>
        </div>
      )}

      {completed.migration && (
        <div className="mt-4 p-3 bg-green-100 rounded-md">
          <p className="text-sm text-green-800">
            🎉 <strong>Setup Complete!</strong> Your enhanced rental backend is ready. 
            Check out the new features in your admin panel!
          </p>
        </div>
      )}
    </div>
  )
}