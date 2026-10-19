import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Subnet Lab | DadLAN Control Centre', description: 'Visual IPv4 subnetting lessons, quizzes and VLSM practice.' };
export default function SubnettingPage() { return (<main style={{maxWidth:1100,margin:"0 auto",padding:"18px 20px 60px"}}><p><Link href="/">← DadLAN Control Centre</Link></p><h1 style={{fontSize:34,margin:"12px 0"}}>Subnet Lab</h1><p>Practise CIDR, subnet ranges and VLSM on fictional networks. No live DadLAN settings are changed.</p><div style={{background:"#fff",padding:8,border:"1px solid #dbe4e9",borderRadius:14}}><iframe src="/subnetting/course.html" title="Interactive Subnet Lab" style={{border:0,width:"100%",height:"1560px",display:"block"}} /></div><p style={{marginTop:12}}><a href="/subnetting/course.html">Open full-screen course ↗</a></p></main>); }
