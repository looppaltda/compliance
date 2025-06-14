import React from 'react';

interface TaskColumnProps {
  title: string;
  count: number;
  tasks: Array<{ id: string; name: string; company: string; }>;
}

export function TaskColumn({ title, count, tasks }: TaskColumnProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm font-medium">
          ({count})
        </span>
      </div>
      
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm">Nenhuma tarefa no momento</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <h4 className="font-medium text-gray-900 text-sm mb-1">{task.name}</h4>
              <p className="text-xs text-gray-600">{task.company}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}