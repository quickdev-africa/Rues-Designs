'use client';

import React from 'react';
import { CategoryInfo } from '../../data/categoryData';

interface CategoryGuideProps {
  category: CategoryInfo;
}

export default function CategoryGuide({ category }: CategoryGuideProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Quick Facts</h3>
        <ul className="space-y-2">
          {category.quickFacts.map((fact, index) => (
            <li key={index} className="flex items-start">
              <span className="text-brand-primary mr-2">•</span>
              <span>
                <span className="font-medium">{fact.title}</span>
                {': '}
                <span className="text-gray-700">{fact.description}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Usage Tips</h3>
        <ul className="space-y-2">
          {category.usageTips.map((tip, index) => (
            <li key={index} className="flex items-start">
              <span className="text-brand-primary mr-2">•</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Rental Guidelines</h3>
        <ul className="space-y-2">
          {category.guidelines.map((guideline, index) => (
            <li key={index} className="flex items-start">
              <span className="text-brand-primary mr-2">•</span>
              <span>{guideline}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
