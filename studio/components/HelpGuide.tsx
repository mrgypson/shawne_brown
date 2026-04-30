import { Box, Card, Container, Heading, Stack, Text } from '@sanity/ui';
import type { ReactNode } from 'react';

function Section({ title, children }: { title: string; children: ReactNode }) {
	return (
		<Stack space={3}>
			<Heading as="h2" size={2}>
				{title}
			</Heading>
			{children}
		</Stack>
	);
}

function Bullet({ children }: { children: ReactNode }) {
	return (
		<Box as="li" style={{ marginBottom: '0.5rem', lineHeight: 1.55 }}>
			<Text size={2}>{children}</Text>
		</Box>
	);
}

function List({ children }: { children: ReactNode }) {
	return (
		<Box as="ul" paddingLeft={4} style={{ margin: 0 }}>
			{children}
		</Box>
	);
}

function Ol({ children }: { children: ReactNode }) {
	return (
		<Box as="ol" paddingLeft={4} style={{ margin: 0 }}>
			{children}
		</Box>
	);
}

function P({ children }: { children: ReactNode }) {
	return (
		<Text size={2} muted={false} style={{ lineHeight: 1.6 }}>
			{children}
		</Text>
	);
}

function Strong({ children }: { children: ReactNode }) {
	return <span style={{ fontWeight: 600 }}>{children}</span>;
}

function Code({ children }: { children: ReactNode }) {
	return (
		<code
			style={{
				fontFamily:
					'ui-monospace, SFMono-Regular, Menlo, Monaco, "Cascadia Mono", Consolas, monospace',
				fontSize: '0.9em',
				background: 'var(--card-code-bg-color, rgba(127,127,127,0.12))',
				padding: '0.05em 0.35em',
				borderRadius: 4,
			}}
		>
			{children}
		</code>
	);
}

/**
 * In-Studio help for editors. Registered as a tool in `sanity.config.ts`.
 * This content mirrors `docs/CLIENT_GUIDE.md` — keep the two in sync when
 * making meaningful changes.
 */
export default function HelpGuide() {
	return (
		<Box padding={[3, 4, 5]} style={{ height: '100%', overflow: 'auto' }}>
			<Container width={1}>
				<Stack space={6}>
					<Stack space={3}>
						<Heading as="h1" size={4}>
							Editing your photography site
						</Heading>
						<P>
							A short reference for keeping content up to date. Day-to-day edits all happen
							here in Studio — you do not need to touch code, hosting, or email services.
						</P>
					</Stack>

					<Section title="The big idea">
						<P>
							The website reads its text and images from this Studio. When you edit a field and
							click <Strong>Publish</Strong>, the site updates within seconds. Drafts auto-save
							but are not visible to visitors until you publish.
						</P>
					</Section>

					<Section title="Where to edit what">
						<List>
							<Bullet>
								<Strong>About &amp; Contact</Strong> — the About page, plus the inbox that
								receives contact-form messages.
							</Bullet>
							<Bullet>
								<Strong>Project</Strong> — each body of work that appears on the Work page.
							</Bullet>
						</List>
					</Section>

					<Section title="Updating the About page">
						<Ol>
							<Bullet>
								Open <Strong>About &amp; Contact</Strong> in the Content list.
							</Bullet>
							<Bullet>
								Edit <Strong>Biography</Strong>, <Strong>Artist statement</Strong>,
								<Strong> Exhibitions &amp; publications</Strong> (click <Strong>Add item</Strong>
								for a new row; drag to reorder), and any of the Contact-page copy fields.
							</Bullet>
							<Bullet>
								Click <Strong>Publish</Strong> (top right).
							</Bullet>
						</Ol>
					</Section>

					<Section title="Where inquiry emails go">
						<P>
							Under the <Strong>Contact</Strong> section of the same document:
						</P>
						<List>
							<Bullet>
								<Strong>Email</Strong> — the inbox that receives contact-form messages. It is
								<Strong> not</Strong> shown on the public Contact page. Change it any time and
								publish; no other change is needed.
							</Bullet>
							<Bullet>
								<Strong>Location</Strong> — optional short label shown on Contact and in the
								footer.
							</Bullet>
							<Bullet>
								<Strong>Instagram</Strong> — your handle (e.g. <Code>@yourhandle</Code>);
								appears on About and in the footer as a link.
							</Bullet>
							<Bullet>
								<Strong>Website</Strong> — optional external site link.
							</Bullet>
						</List>
					</Section>

					<Section title="Adding a project">
						<Ol>
							<Bullet>
								In the Content list, open <Strong>Project</Strong> and click{' '}
								<Strong>Create</Strong>.
							</Bullet>
							<Bullet>
								Fill in <Strong>Title</Strong>, click <Strong>Generate</Strong> for the{' '}
								<Strong>Slug</Strong> (the URL — try to keep this stable after launch),{' '}
								<Strong>Year / span</Strong>, <Strong>Short description</Strong>, and the{' '}
								<Strong>Cover image</Strong> (with alternative text).
							</Bullet>
							<Bullet>
								In <Strong>Gallery</Strong>, click <Strong>Add item</Strong> per image. Each
								image needs <Strong>Alternative text</Strong>. Use the spacing fields (0–4) to
								fine-tune layout: <Strong>Space above / below</Strong> controls vertical
								rhythm; <Strong>Inset left / right</Strong> narrows an image inside the column.
							</Bullet>
							<Bullet>
								<Strong>Project type</Strong> is normally <Strong>Standard</Strong>. Switch to{' '}
								<Strong>Neuhoff</Strong> only for projects that need edition / print-sales
								fields.
							</Bullet>
							<Bullet>
								Click <Strong>Publish</Strong>.
							</Bullet>
						</Ol>
					</Section>

					<Section title="Reordering projects">
						<P>
							Each project has a <Strong>Sort order</Strong> number. Lower numbers appear
							first on the Work page (<Code>1</Code> first, <Code>2</Code> second, and so on).
							You only need to number the projects whose order matters.
						</P>
					</Section>

					<Section title="Replacing an image">
						<Ol>
							<Bullet>Open the project.</Bullet>
							<Bullet>
								In the gallery row, click the image → <Strong>Remove</Strong> → upload the new
								image.
							</Bullet>
							<Bullet>
								Update <Strong>Alternative text</Strong> and click <Strong>Publish</Strong>.
							</Bullet>
						</Ol>
					</Section>

					<Section title="Images — what works best">
						<List>
							<Bullet>
								Upload large originals (at least <Strong>2400 pixels</Strong> on the long
								edge); the site resizes automatically.
							</Bullet>
							<Bullet>JPEG or PNG; Studio will optimize.</Bullet>
							<Bullet>
								<Strong>Always set Alternative text</Strong> — it is required and helps
								accessibility and SEO.
							</Bullet>
							<Bullet>
								Use the <Strong>hotspot</Strong> tool to control what stays visible when the
								image is cropped (especially useful on cover images).
							</Bullet>
						</List>
					</Section>

					<Section title="Drafts vs publish">
						<List>
							<Bullet>Edits auto-save as drafts as you type.</Bullet>
							<Bullet>Drafts are visible only inside Studio.</Bullet>
							<Bullet>
								Click <Strong>Publish</Strong> to make changes live.
							</Bullet>
							<Bullet>
								The history icon on the top bar lets you review or roll back previous
								revisions.
							</Bullet>
						</List>
					</Section>

					<Section title="The contact form">
						<List>
							<Bullet>
								Visitors submit Name, Email, and Message on the Contact page.
							</Bullet>
							<Bullet>
								Messages are delivered to the <Strong>Email</Strong> field in{' '}
								<Strong>About &amp; Contact</Strong>.
							</Bullet>
							<Bullet>
								Not receiving messages? Check spam, confirm the Email field is correct and
								published, and ping your developer if still missing.
							</Bullet>
						</List>
					</Section>

					<Section title="Troubleshooting">
						<Card padding={3} radius={2} shadow={1} tone="primary">
							<Stack space={3}>
								<Text size={2}>
									<Strong>Changes not showing on the site?</Strong> Make sure you clicked{' '}
									<Strong>Publish</Strong>, then hard-reload the page (<Code>Cmd+Shift+R</Code>{' '}
									on Mac).
								</Text>
								<Text size={2}>
									<Strong>New project missing on Work?</Strong> It has to be <Strong>Published</Strong>{' '}
									and have a <Strong>Slug</Strong>.
								</Text>
								<Text size={2}>
									<Strong>A URL broke?</Strong> A <Strong>Slug</Strong> was changed. Keep slugs
									stable after launch; if you must rename, tell your developer so old links can
									be redirected.
								</Text>
							</Stack>
						</Card>
					</Section>

					<Section title="What to ask your developer about">
						<List>
							<Bullet>Design or layout changes to page templates.</Bullet>
							<Bullet>New kinds of content (e.g. a Blog or Events section).</Bullet>
							<Bullet>Changing the domain name or hosting.</Bullet>
							<Bullet>Anything that involves code, DNS, or ownership of third-party accounts.</Bullet>
						</List>
					</Section>

					<Section title="Glossary">
						<List>
							<Bullet>
								<Strong>Studio</Strong> — this editing app (Sanity).
							</Bullet>
							<Bullet>
								<Strong>Document</Strong> — one editable entry (a project, or the About page).
							</Bullet>
							<Bullet>
								<Strong>Field</Strong> — a single input within a document.
							</Bullet>
							<Bullet>
								<Strong>Slug</Strong> — the URL piece for a project (<Code>/work/&lt;slug&gt;</Code>).
							</Bullet>
							<Bullet>
								<Strong>Publish</Strong> — make the current draft live on the site.
							</Bullet>
							<Bullet>
								<Strong>Alt text</Strong> — short description of an image for accessibility.
							</Bullet>
						</List>
					</Section>
				</Stack>
			</Container>
		</Box>
	);
}
