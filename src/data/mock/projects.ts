import type { Project } from '../../types/project';
import type { NeuhoffImage } from '../../types/neuhoff';
import type { PrintAvailability } from '../../types/neuhoff';

const PLACEHOLDER = '/images/projects/placeholder.svg';

const availabilityCycle: PrintAvailability[] = [
	'available',
	'reserved',
	'sold',
	'nfs',
];

function buildNeuhoffImages(count: number): NeuhoffImage[] {
	return Array.from({ length: count }, (_, i) => {
		const n = i + 1;
		const availability = availabilityCycle[i % availabilityCycle.length];
		return {
			src: PLACEHOLDER,
			alt: `The Neuhoff Project, photograph ${n} (placeholder)`,
			caption: n % 6 === 0 ? `Untitled (${n})` : undefined,
			printNumber: `NHP-${String(n).padStart(3, '0')}`,
			printSales: {
				printNumber: `NHP-${String(n).padStart(3, '0')}`,
				availability,
				price: availability === 'sold' || availability === 'nfs' ? undefined : '$1,200',
				sizeOptions:
					n % 3 === 0
						? ['16 × 20 in', '20 × 24 in', '24 × 30 in']
						: ['16 × 20 in', '20 × 24 in'],
				framedOption: n % 4 !== 0,
				inquiryOrPurchase:
					availability === 'available' ? 'inquiry' : availability === 'nfs' ? 'none' : 'inquiry',
			},
		};
	});
}

export const mockProjects: Project[] = [
	{
		kind: 'neuhoff',
		title: 'The Neuhoff Project',
		slug: 'the-neuhoff-project',
		yearLabel: '2019–2024',
		shortDescription:
			'A sustained study of an industrial site in transition — surfaces, weather, and the residue of labor.',
		longDescription:
			'Made over several seasons, this series follows the Neuhoff complex as structures empty, light shifts, and new uses emerge. The photographs prioritize texture and duration over narrative closure; they are intended as large prints with long viewing distances.',
		coverImage: {
			src: PLACEHOLDER,
			alt: 'The Neuhoff Project — cover (placeholder)',
		},
		showOnHome: true,
		images: buildNeuhoffImages(25),
	},
	{
		kind: 'standard',
		title: 'River Notes',
		slug: 'river-notes',
		yearLabel: '2021',
		shortDescription: 'Small-format observations along a single waterway through winter.',
		longDescription:
			'River Notes began as a daily walk and became a ledger of minor changes: ice, mist, debris, the same bend seen until it became unfamiliar.',
		coverImage: {
			src: PLACEHOLDER,
			alt: 'River Notes — cover (placeholder)',
		},
		showOnHome: true,
		images: Array.from({ length: 8 }, (_, i) => ({
			src: PLACEHOLDER,
			alt: `River Notes, frame ${i + 1} (placeholder)`,
			caption: i === 3 ? 'Thaw, morning' : undefined,
			printNumber: `RN-0${i + 1}`,
		})),
	},
	{
		kind: 'standard',
		title: 'Interior Weather',
		slug: 'interior-weather',
		yearLabel: '2018–2020',
		shortDescription: 'Domestic interiors read through window light and slow seasons.',
		coverImage: {
			src: PLACEHOLDER,
			alt: 'Interior Weather — cover (placeholder)',
		},
		showOnHome: true,
		images: Array.from({ length: 12 }, (_, i) => ({
			src: PLACEHOLDER,
			alt: `Interior Weather, study ${i + 1} (placeholder)`,
		})),
	},
	{
		kind: 'standard',
		title: 'Plain Air',
		slug: 'plain-air',
		yearLabel: '2016',
		shortDescription: 'Horizon-led landscapes from the high plains — spare, high-key, wind-shaped.',
		coverImage: {
			src: PLACEHOLDER,
			alt: 'Plain Air — cover (placeholder)',
		},
		showOnHome: true,
		images: Array.from({ length: 10 }, (_, i) => ({
			src: PLACEHOLDER,
			alt: `Plain Air, plate ${i + 1} (placeholder)`,
			caption: i % 7 === 0 ? 'After rain' : undefined,
		})),
	},
];
