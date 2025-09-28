"use client";
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Input } from '../../components/Input';
import { Modal } from '../../components/Modal';
import { Badge } from '../../components/Badge';
import { Avatar } from '../../components/Avatar';

import React from 'react';
import NextImage from 'next/image';
import { useState } from 'react';
import dynamic from 'next/dynamic';

export default function DemoPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const FirestoreTest = dynamic(() => import('./firestore-test'), { ssr: false });
  return (
    <main className="min-h-screen bg-secondary flex flex-col items-center justify-center gap-8 p-8">
      <section className="flex flex-col items-center gap-2">
        <h2 className="font-heading text-2xl text-primary">Logo Samples</h2>
    <div className="flex gap-4 flex-wrap items-center">
      <img src="/assets/logos/primary.svg" alt="Primary Logo" width={120} height={40} />
      <img src="/assets/logos/white.svg" alt="White Logo" width={120} height={40} style={{ background: '#31473A', borderRadius: 8 }} />
      <img src="/assets/logos/black.svg" alt="Black Logo" width={120} height={40} style={{ background: '#fff', borderRadius: 8, border: '1px solid #31473A' }} />
      <img src="/assets/logos/icon-only.svg" alt="Icon Only Logo" width={40} height={40} />
        </div>
      </section>
      <section className="flex flex-col items-center gap-2">
        <h2 className="font-heading text-2xl text-primary mt-8">Placeholder Images</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <NextImage src="/assets/placeholders/product-placeholder.svg" alt="Product Placeholder" width={200} height={100} />
            <NextImage src="/assets/placeholders/event-placeholder.svg" alt="Event Placeholder" width={200} height={100} />
            <NextImage src="/assets/placeholders/testimonial-placeholder.svg" alt="Testimonial Placeholder" width={200} height={100} />
            <NextImage src="/assets/placeholders/gallery-placeholder.svg" alt="Gallery Placeholder" width={200} height={100} />
            <NextImage src="/assets/placeholders/banner-placeholder.svg" alt="Banner Placeholder" width={200} height={100} />
            <NextImage src="/assets/placeholders/service-placeholder.svg" alt="Service Placeholder" width={200} height={100} />
            <NextImage src="/assets/placeholders/team-placeholder.svg" alt="Team Placeholder" width={200} height={100} />
        </div>
      </section>
      <h1 className="font-heading text-4xl text-primary mb-4">Design System Demo</h1>
      <div className="flex gap-4 flex-wrap">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="accent">Accent</Button>
        <Button variant="success">Success</Button>
        <Button variant="warning">Warning</Button>
        <Button variant="error">Error</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
      <div className="flex gap-4 flex-wrap items-center">
        <Badge color="primary">Primary</Badge>
        <Badge color="secondary">Secondary</Badge>
        <Badge color="accent">Accent</Badge>
        <Badge color="success">Success</Badge>
        <Badge color="warning">Warning</Badge>
        <Badge color="error">Error</Badge>
      </div>
      <div className="flex gap-4 flex-wrap items-center">
        <Avatar src="https://randomuser.me/api/portraits/men/32.jpg" alt="User 1" />
        <Avatar src="https://randomuser.me/api/portraits/women/44.jpg" alt="User 2" size={60} />
      </div>
      <Card title="Sample Card" image="https://source.unsplash.com/400x200/?party,decor">
        This is a card component. Use it for product, service, or event highlights.
      </Card>
      <form className="w-full max-w-sm">
        <Input label="Name" placeholder="Enter your name" />
        <Input label="Email" type="email" placeholder="Enter your email" />
        <Button type="button" variant="accent" onClick={() => setModalOpen(true)}>
          Show Modal
        </Button>
      </form>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Modal Title">
        <p>This is a modal. Use it for dialogs, confirmations, or forms.</p>
        <Button variant="primary" onClick={() => setModalOpen(false)}>
          Close
        </Button>
      </Modal>
      {/* Supabase Test UI */}
      <section className="w-full max-w-2xl mt-8">
        <h2 className="font-heading text-2xl text-primary mb-2">Supabase Test UI</h2>
        <FirestoreTest />
      </section>
    </main>
  );
}
