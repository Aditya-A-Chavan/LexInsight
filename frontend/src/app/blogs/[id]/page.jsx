'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Mock data to be replaced with actual API call
const blogs = [
  {
    id: "blog-001",
    title: "Understanding Fundamental Rights in India",
    summary:
      "A beginner-friendly guide to the fundamental rights provided under the Indian Constitution and their importance.",
    content:
      "Constitutional rights are the backbone of our democracy. This article explores how these rights protect citizens and their significance in everyday legal scenarios.\n\nThe Constitution of India guarantees fundamental rights to all citizens, which are essential for their intellectual, moral, and spiritual development. These rights are enumerated in Part III of the Constitution, from Articles 12 to 35.\n\nThe six fundamental rights recognized by the Indian constitution are:\n\n1. Right to Equality (Articles 14-18)\nThis includes equality before the law, prohibition of discrimination on grounds of religion, race, caste, gender or place of birth, equality of opportunity in matters of public employment, and abolition of untouchability and titles.\n\n2. Right to Freedom (Articles 19-22)\nThis includes freedom of speech and expression, assembly, association, movement, residence, and the right to practice any profession, occupation, trade or business. It also provides for protection against arbitrary arrest and detention.\n\n3. Right against Exploitation (Articles 23-24)\nThis prohibits trafficking in human beings and forced labor, and also prohibits the employment of children in factories, mines, and other hazardous occupations.\n\n4. Right to Freedom of Religion (Articles 25-28)\nThis includes freedom of conscience and free profession, practice, and propagation of religion, freedom to manage religious affairs, freedom from payment of taxes for promotion of any particular religion, and freedom from religious instruction in certain educational institutions.\n\n5. Cultural and Educational Rights (Articles 29-30)\nThis provides for the protection of the interests of minorities, including their right to conserve their language, script, and culture, and to establish and administer educational institutions of their choice.\n\n6. Right to Constitutional Remedies (Article 32)\nThis gives citizens the right to approach the Supreme Court for the enforcement of their fundamental rights. Dr. B.R. Ambedkar called this the 'heart and soul' of the Constitution.\n\nThese rights are justiciable, meaning that they are enforceable by courts. If a citizen's fundamental rights are violated, they can approach the Supreme Court directly under Article 32 or the High Courts under Article 226.\n\nHowever, fundamental rights are not absolute and are subject to reasonable restrictions imposed by the state in the interests of sovereignty and integrity of India, security of the state, friendly relations with foreign states, public order, decency or morality, or in relation to contempt of court, defamation or incitement to an offence.\n\nIt's important for every citizen to be aware of these rights, as they form the foundation of our democratic society and protect us from potential abuses of power.",
    date: "May 15, 2023",
    lawyer: {
      name: "Adv. Priya Sharma",
      profile: "/images/lawyers/priya-sharma.jpg",
      credentials: "Constitutional Law Expert, 12+ years experience",
      bio: "Priya Sharma is a distinguished Constitutional Law expert with over 12 years of practice at the Supreme Court of India. She has been involved in several landmark cases that have shaped the interpretation of fundamental rights in India."
    },
    categories: ["Constitutional Law", "Human Rights"],
    likes: 128,
    comments: 36,
    relatedPosts: ["blog-002", "blog-003"]
  },
  {
    id: "blog-002",
    title: "How to File an FIR: Step-by-Step",
    summary:
      "Know your rights and learn the correct procedure to file a First Information Report in India.",
    content:
      "Filing an FIR correctly can make all the difference in your case. Here's what you need to know about the process, your rights, and common mistakes to avoid.\n\nA First Information Report (FIR) is a written document prepared by the police when they receive information about the commission of a cognizable offense. It sets the criminal law in motion and marks the start of the criminal investigation process.\n\n## What is a Cognizable Offense?\n\nA cognizable offense is one in which the police can arrest without a warrant and start an investigation without the permission of a court. Examples include theft, murder, rape, kidnapping, and dowry death.\n\n## When Should You File an FIR?\n\nAn FIR should be filed as soon as possible after the occurrence of a cognizable offense. Delay in filing an FIR can weaken your case, as it might raise questions about the credibility of the complaint.\n\n## Who Can File an FIR?\n\n- The person against whom the offense was committed\n- Anyone who witnessed the crime\n- Anyone who knows about the crime\n\n## Step-by-Step Guide to Filing an FIR\n\n1. **Visit the Correct Police Station**\n   Go to the police station that has jurisdiction over the area where the crime occurred.\n\n2. **Meet the Officer in Charge**\n   Ask to speak with the Station House Officer (SHO) or the officer in charge.\n\n3. **Provide Your Statement**\n   Give a detailed account of the incident. Be truthful and accurate.\n\n4. **Review the FIR Before Signing**\n   The officer will record your statement in the FIR. Read it carefully before signing. Ensure all important details are included correctly.\n\n5. **Collect a Copy of the FIR**\n   You are entitled to a free copy of the FIR. Always collect it before leaving the police station.\n\n## Your Rights When Filing an FIR\n\n- The police cannot refuse to register an FIR for a cognizable offense\n- If they refuse, you can send your complaint in writing to the Superintendent of Police\n- You can also approach a magistrate under Section 156(3) of CrPC if the police refuse to file an FIR\n- You can file a Zero FIR at any police station if you can't go to the station with jurisdiction\n\n## Common Mistakes to Avoid\n\n1. **Withholding Information**: Be comprehensive in your statement\n2. **Not Collecting a Copy of the FIR**: Always get your copy\n3. **Delaying the Filing**: File as soon as possible after the incident\n4. **Inconsistent Statements**: Stick to facts and avoid contradictions\n\n## What Happens After Filing an FIR?\n\nAfter an FIR is filed, the police start their investigation. This may include visiting the crime scene, collecting evidence, recording statements of witnesses, and making arrests if necessary. Based on their investigation, they file a charge sheet (if there's sufficient evidence) or a closure report (if there's not enough evidence).\n\nRemember, filing an FIR is your legal right, and no police station can refuse to register it for a cognizable offense. If you face any issues, don't hesitate to approach higher authorities or the courts.",
    date: "June 3, 2023",
    lawyer: {
      name: "Adv. Rajiv Malhotra",
      profile: "/images/lawyers/rajiv-malhotra.jpg",
      credentials: "Criminal Law Specialist, Former Public Prosecutor",
      bio: "Rajiv Malhotra has served as a Public Prosecutor for 8 years before starting his private practice. With extensive experience in criminal proceedings, he specializes in guiding clients through the complexities of the Indian criminal justice system."
    },
    categories: ["Criminal Law"],
    likes: 94,
    comments: 21,
    relatedPosts: ["blog-001", "blog-003"]
  },
  {
    id: "blog-003",
    title: "Legal Rights of Women in India",
    summary:
      "An overview of key legal protections and support systems available to women under Indian law.",
    content:
      "From workplace harassment laws to domestic violence protection, this article covers essential legal knowledge every woman should be aware of.\n\nIndia has a comprehensive legal framework designed to protect women's rights and ensure gender equality. Despite ongoing challenges, understanding these rights is the first step toward empowerment and protection.\n\n## Constitutional Provisions\n\nThe Constitution of India guarantees equality of opportunity, dignity, and justice for all citizens. Several provisions specifically address women's rights:\n\n- **Article 14**: Guarantees equality before the law\n- **Article 15(3)**: Empowers the state to make special provisions for women and children\n- **Article 16**: Ensures equal opportunity in public employment\n- **Article 39**: Directs the state to secure equal pay for equal work and health protection for workers\n\n## Protection from Domestic Violence\n\nThe Protection of Women from Domestic Violence Act, 2005, provides civil remedies to victims of domestic violence. Under this law, women can seek:\n\n- Protection orders\n- Residence orders\n- Monetary relief\n- Custody orders for children\n- Compensation for damages\n\nDomestic violence includes physical, sexual, verbal, emotional, or economic abuse. The law protects not only wives but also women in live-in relationships, sisters, widows, mothers, and single women living in a shared household.\n\n## Sexual Harassment at Workplace\n\nThe Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013, protects women from sexual harassment at work. Every organization with more than 10 employees must:\n\n- Establish an Internal Complaints Committee\n- Develop a clear sexual harassment policy\n- Conduct regular awareness programs\n\nA complaint must be filed within three months of the incident, and the committee must complete its inquiry within 90 days.\n\n## Maternity Benefits\n\nThe Maternity Benefit (Amendment) Act, 2017, provides:\n\n- 26 weeks of paid maternity leave for the first two children\n- 12 weeks for the third child onwards\n- 12 weeks for adopting mothers and commissioning mothers (in surrogacy)\n- Work-from-home options after the leave period\n- Crèche facilities in establishments with 50 or more employees\n\n## Criminal Laws Protecting Women\n\nThe Indian Penal Code contains several provisions to protect women from crimes:\n\n- **Section 354**: Assault or use of criminal force on a woman with intent to outrage her modesty\n- **Section 375**: Rape\n- **Section 376**: Punishment for rape\n- **Section 498A**: Cruelty by husband or his relatives\n- **Section 304B**: Dowry death\n\n## Equal Remuneration\n\nThe Equal Remuneration Act, 1976, mandates equal pay for men and women for the same work or work of similar nature, and prohibits discrimination in recruitment, promotions, and transfers.\n\n## Property Rights\n\nThe Hindu Succession (Amendment) Act, 2005, gives daughters the same rights as sons in ancestral property. Muslim women can inherit property as per the Muslim Personal Law (Shariat) Application Act, 1937, though the share is generally less than that of male heirs.\n\n## Support Systems\n\nSeveral support systems exist for women facing legal issues:\n\n1. **Women's Helpline (1091)**: 24-hour emergency assistance\n2. **National Commission for Women**: Addresses grievances and ensures safeguards for women's rights\n3. **Legal Services Authorities**: Provides free legal aid to women\n4. **One Stop Centres**: Supports women affected by violence\n\nKnowing your legal rights is the first step toward ensuring justice and equality. If you face any form of discrimination or violence, don't hesitate to seek help and exercise your rights.",
    date: "April 22, 2023",
    lawyer: {
      name: "Adv. Meera Patel",
      profile: "/images/lawyers/meera-patel.jpg",
      credentials: "Women's Rights Advocate, Supreme Court",
      bio: "Meera Patel is a passionate advocate for women's rights and gender equality with a focus on cases related to domestic violence and workplace harassment. She regularly conducts legal awareness workshops for women across India."
    },
    categories: ["Family Law", "Human Rights"],
    likes: 215,
    comments: 48,
    relatedPosts: ["blog-001", "blog-002"]
  },
];

export default function BlogPost() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    // Simulate API fetch with mock data
    const fetchBlog = () => {
      try {
        const foundBlog = blogs.find(blog => blog.id === id);
        
        if (!foundBlog) {
          throw new Error('Blog post not found');
        }
        
        setBlog(foundBlog);
        
        // Get related blogs
        if (foundBlog.relatedPosts && foundBlog.relatedPosts.length > 0) {
          const related = blogs.filter(b => foundBlog.relatedPosts.includes(b.id));
          setRelatedBlogs(related);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Small delay to simulate API call
    setTimeout(fetchBlog, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold text-red-600">Error</h1>
        <p className="text-gray-600">{error}</p>
        <Link href="/blogs" className="mt-4 text-green-600 hover:underline">
          Back to blogs
        </Link>
      </div>
    );
  }

  if (!blog) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white shadow-sm border-b border-gray-200 py-3 px-4 sm:px-6 lg:px-8 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center">
          <Link href="/blogs" className="text-green-600 font-medium flex items-center mr-6">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to blogs
          </Link>
          <h1 className="text-xl font-bold text-gray-800 truncate flex-1">
            {blog.title}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Article Header */}
              <div className="p-6 border-b border-gray-100">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{blog.title}</h1>
                
                {/* Lawyer info */}
                <div className="flex items-center mb-5">
                  <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200 mr-3">
                    <img 
                      src={blog.lawyer.profile} 
                      alt={blog.lawyer.name}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/48?text=Lawyer";
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{blog.lawyer.name}</h3>
                    <p className="text-sm text-gray-500">{blog.lawyer.credentials}</p>
                  </div>
                  <div className="ml-auto text-sm text-gray-500">{blog.date}</div>
                </div>
                
                {/* Categories */}
                <div className="flex gap-2 mb-6">
                  {blog.categories?.map((category) => (
                    <span 
                      key={category} 
                      className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                
                <p className="text-lg text-gray-700 italic border-l-4 border-green-500 pl-4 py-2 bg-green-50">
                  {blog.summary}
                </p>
              </div>
              
              {/* Article Content */}
              <div className="p-6">
                <div className="prose prose-green max-w-none">
                  {blog.content.split('\n\n').map((paragraph, idx) => {
                    // Handle markdown headers
                    if (paragraph.startsWith('##')) {
                      return <h2 key={idx} className="text-xl font-bold mt-6 mb-3 text-gray-800">{paragraph.replace('## ', '')}</h2>;
                    }
                    else if (paragraph.startsWith('#')) {
                      return <h1 key={idx} className="text-2xl font-bold mt-8 mb-4 text-gray-800">{paragraph.replace('# ', '')}</h1>;
                    }
                    // Handle lists
                    else if (paragraph.match(/^\d\.\s/)) {
                      return (
                        <ol key={idx} className="list-decimal list-inside my-4 ml-4">
                          {paragraph.split('\n').map((item, i) => (
                            <li key={i} className="mb-2">{item.replace(/^\d\.\s/, '')}</li>
                          ))}
                        </ol>
                      );
                    }
                    else if (paragraph.match(/^-\s/)) {
                      return (
                        <ul key={idx} className="list-disc list-inside my-4 ml-4">
                          {paragraph.split('\n').map((item, i) => (
                            <li key={i} className="mb-2">{item.replace(/^-\s/, '')}</li>
                          ))}
                        </ul>
                      );
                    }
                    // Regular paragraphs
                    return <p key={idx} className="mb-4 leading-relaxed">{paragraph}</p>;
                  })}
                </div>
              </div>
              
              {/* Article Footer */}
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <button className="flex items-center text-gray-600 hover:text-green-600">
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span>{blog.likes} likes</span>
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-green-600">
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      <span>{blog.comments} comments</span>
                    </button>
                  </div>
                  <div>
                    <button className="flex items-center text-gray-600 hover:text-green-600">
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Author Bio */}
            <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
              <h2 className="text-lg font-bold mb-4 text-gray-800">About the Author</h2>
              <div className="flex items-start">
                <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-200 mr-4 flex-shrink-0">
                  <img 
                    src={blog.lawyer.profile} 
                    alt={blog.lawyer.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/64?text=Lawyer";
                    }}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{blog.lawyer.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{blog.lawyer.credentials}</p>
                  <p className="text-gray-700">{blog.lawyer.bio}</p>
                  <button className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
                    Follow
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Sidebar */}
          <div className="hidden lg:block w-80 shrink-0">
            {/* Related Articles */}
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Related Articles</h3>
              <div className="space-y-4">
                {relatedBlogs.map((relatedBlog) => (
                  <Link href={`/blogs/${relatedBlog.id}`} key={relatedBlog.id}>
                    <div className="group cursor-pointer">
                      <h4 className="font-medium text-gray-800 group-hover:text-green-600">
                        {relatedBlog.title}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {relatedBlog.summary}
                      </p>
                      <div className="flex items-center mt-2">
                        <div className="h-6 w-6 rounded-full overflow-hidden bg-gray-200 mr-2">
                          <img 
                            src={relatedBlog.lawyer.profile} 
                            alt={relatedBlog.lawyer.name}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://via.placeholder.com/24?text=L";
                            }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">{relatedBlog.lawyer.name}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              <div className="border-t border-gray-100 my-6 pt-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {blog.categories?.map((category) => (
                    <Link href={`/blogs?category=${category}`} key={category}>
                      <span className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700">
                        {category}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}