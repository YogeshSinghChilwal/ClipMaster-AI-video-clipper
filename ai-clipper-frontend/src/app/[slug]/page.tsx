import FooterPlaceholderPage from "~/components/footer-links-handler";


export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // ✅ await params

  return <FooterPlaceholderPage pageType={slug} />;
}
