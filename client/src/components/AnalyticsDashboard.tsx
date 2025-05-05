import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bar, Line, Pie } from "recharts";
import { useAuth } from "@/hooks/use-auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Link } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

// Type definitions
type ConversionMetric = {
  period: string;
  visitors: number;
  leads: number;
  conversions: number;
  conversionRate: number;
};

type SourceData = {
  source: string;
  visitors: number;
  leads: number;
  color: string;
};

type PageViewData = {
  page: string;
  views: number;
  timeOnPage: number;
};

// Sample data (in production, this would come from Firebase)
const sampleConversionData: ConversionMetric[] = [
  {
    period: "Week 1",
    visitors: 2500,
    leads: 120,
    conversions: 18,
    conversionRate: 15,
  },
  {
    period: "Week 2",
    visitors: 3200,
    leads: 180,
    conversions: 24,
    conversionRate: 13.3,
  },
  {
    period: "Week 3",
    visitors: 2800,
    leads: 150,
    conversions: 21,
    conversionRate: 14,
  },
  {
    period: "Week 4",
    visitors: 4100,
    leads: 230,
    conversions: 35,
    conversionRate: 15.2,
  },
];

const sampleSourceData: SourceData[] = [
  { source: "Organic Search", visitors: 4200, leads: 230, color: "#39FF14" },
  { source: "Social Media", visitors: 3100, leads: 180, color: "#0066FF" },
  { source: "Direct", visitors: 2600, leads: 120, color: "#FF5500" },
  { source: "Referral", visitors: 1900, leads: 90, color: "#9147FF" },
  { source: "Email", visitors: 1200, leads: 60, color: "#FF3A3A" },
];

const samplePageViewData: PageViewData[] = [
  { page: "Home", views: 8500, timeOnPage: 45 },
  { page: "Classes", views: 4800, timeOnPage: 90 },
  { page: "Pricing", views: 6200, timeOnPage: 120 },
  { page: "Trainers", views: 3900, timeOnPage: 75 },
  { page: "Join Now", views: 4500, timeOnPage: 60 },
];

const periodOptions = [
  "Last 7 days",
  "Last 30 days",
  "Last 90 days",
  "Year to date",
  "All time",
];

const AnalyticsDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("conversions");
  const [period, setPeriod] = useState("Last 30 days");
  const [conversionData, setConversionData] = useState<ConversionMetric[]>([]);
  const [sourceData, setSourceData] = useState<SourceData[]>([]);
  const [pageViewData, setPageViewData] = useState<PageViewData[]>([]);
  const [loading, setLoading] = useState(true);

  // Calculate key metrics
  const totalVisitors = conversionData.reduce(
    (sum, item) => sum + item.visitors,
    0
  );
  const totalLeads = conversionData.reduce((sum, item) => sum + item.leads, 0);
  const totalConversions = conversionData.reduce(
    (sum, item) => sum + item.conversions,
    0
  );
  const averageConversionRate =
    totalLeads > 0 ? (totalConversions / totalLeads) * 100 : 0;

  // In a real application, you would fetch this data from Firebase
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setLoading(true);

        // In a real implementation, you would fetch actual data from Firebase
        // For demo purposes, we'll use the sample data
        setConversionData(sampleConversionData);
        setSourceData(sampleSourceData);
        setPageViewData(samplePageViewData);

        // Example of how you would fetch data in production:
        /*
        const analyticsRef = collection(db, 'analyticsEvents');
        const q = query(analyticsRef, 
          where('eventType', '==', 'pageview'),
          orderBy('createdAt', 'desc'),
          limit(100)
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        // Process the data here
        */
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, [period]);

  if (!user) {
    return (
      <section className="py-20 bg-[#121212]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-poppins font-bold mb-4">
            Analytics Dashboard
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Please login to view the analytics dashboard.
          </p>
        </div>
      </section>
    );
  }

  // Render metrics cards
  const renderMetricsCards = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="h-32 bg-[#1A1A1A] rounded-lg animate-pulse"
              ></div>
            ))}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <Card className="bg-[#1A1A1A] border-[#333]">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Visitors</CardTitle>
              <CardDescription>Total website visitors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {totalVisitors.toLocaleString()}
              </div>
              <div className="text-sm text-green-500 flex items-center mt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586l3.293-3.293A1 1 0 0112 7z"
                    clipRule="evenodd"
                  />
                </svg>
                14.5% from last period
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card className="bg-[#1A1A1A] border-[#333]">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Leads</CardTitle>
              <CardDescription>Form submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {totalLeads.toLocaleString()}
              </div>
              <div className="text-sm text-green-500 flex items-center mt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586l3.293-3.293A1 1 0 0112 7z"
                    clipRule="evenodd"
                  />
                </svg>
                8.2% from last period
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Card className="bg-[#1A1A1A] border-[#333]">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Conversions</CardTitle>
              <CardDescription>Membership sign-ups</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {totalConversions.toLocaleString()}
              </div>
              <div className="text-sm text-green-500 flex items-center mt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586l3.293-3.293A1 1 0 0112 7z"
                    clipRule="evenodd"
                  />
                </svg>
                12.3% from last period
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Card className="bg-[#1A1A1A] border-[#333]">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Conversion Rate</CardTitle>
              <CardDescription>Lead to member ratio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {averageConversionRate.toFixed(1)}%
              </div>
              <div className="text-sm text-green-500 flex items-center mt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586l3.293-3.293A1 1 0 0112 7z"
                    clipRule="evenodd"
                  />
                </svg>
                3.5% from last period
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  };

  return (
    <section className="py-20 bg-[#121212]" id="analytics">
      <div className="container mx-auto px-4">
        <div className="box mx-auto px-4">
          <Link
            to="/"
            className="inline-block bg-[#39FF14] text-black font-semibold py-2 px-4 rounded hover:bg-[#2ecc71] transition duration-200"
          >
            ← Back to Home
          </Link>
        </div>

        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4">
            ANALYTICS <span className="text-[#39FF14]">DASHBOARD</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Track your marketing performance and conversion metrics to optimize
            your fitness business.
          </p>
        </motion.div>

        {/* Period selector */}
        <div className="flex justify-end mb-8">
          <div className="w-48">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="bg-[#1A1A1A] border-[#333]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1A1A] border-[#333]">
                {periodOptions.map((option) => (
                  <SelectItem
                    key={option}
                    value={option}
                    className="text-white focus:bg-[#333] focus:text-white"
                  >
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Metrics cards */}
        {renderMetricsCards()}

        {/* The Tabs component with TabsContent */}
        <Tabs
          defaultValue="conversions"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-8 bg-[#1A1A1A]">
            <TabsTrigger
              value="conversions"
              className="data-[state=active]:bg-[#39FF14] data-[state=active]:text-black"
            >
              Conversions
            </TabsTrigger>
            <TabsTrigger
              value="sources"
              className="data-[state=active]:bg-[#39FF14] data-[state=active]:text-black"
            >
              Sources
            </TabsTrigger>
            <TabsTrigger
              value="pages"
              className="data-[state=active]:bg-[#39FF14] data-[state=active]:text-black"
            >
              Page Views
            </TabsTrigger>
          </TabsList>

          {/* Conversions Tab Content */}
          <TabsContent value="conversions">
            <Card className="bg-[#1A1A1A] border-[#333]">
              <CardHeader>
                <CardTitle>Conversion Metrics Over Time</CardTitle>
                <CardDescription>
                  Track the performance of your conversion funnel
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="h-80 bg-[#222] rounded-lg animate-pulse"></div>
                ) : (
                  <div className="h-80 bg-[#222] rounded-lg p-4">
                    {/* Recharts would be used here in a real implementation */}
                    <div className="h-full flex items-center justify-center">
                      <p className="text-gray-400">
                        Interactive chart would appear here in production
                      </p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                  {conversionData.map((item, index) => (
                    <Card key={index} className="bg-[#222] border-[#333]">
                      <CardHeader className="py-4 px-4">
                        <CardTitle className="text-lg">{item.period}</CardTitle>
                      </CardHeader>
                      <CardContent className="pb-4 px-4">
                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Visitors to Leads</span>
                              <span>
                                {((item.leads / item.visitors) * 100).toFixed(
                                  1
                                )}
                                %
                              </span>
                            </div>
                            <Progress
                              value={(item.leads / item.visitors) * 100}
                              className="h-2 bg-[#333]"
                            />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Leads to Conversions</span>
                              <span>{item.conversionRate.toFixed(1)}%</span>
                            </div>
                            <Progress
                              value={item.conversionRate}
                              className="h-2 bg-[#333]"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sources Tab Content */}
          <TabsContent value="sources">
            <Card className="bg-[#1A1A1A] border-[#333]">
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>
                  See where your visitors are coming from
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="h-80 bg-[#222] rounded-lg animate-pulse"></div>
                ) : (
                  <div className="h-80 bg-[#222] rounded-lg p-4">
                    {/* Recharts would be used here in a real implementation */}
                    <div className="h-full flex items-center justify-center">
                      <p className="text-gray-400">
                        Interactive pie chart would appear here in production
                      </p>
                    </div>
                  </div>
                )}

                <div className="mt-6">
                  <div className="space-y-4">
                    {sourceData.map((source) => (
                      <div key={source.source} className="flex items-center">
                        <div
                          className="w-4 h-4 rounded-full mr-3"
                          style={{ backgroundColor: source.color }}
                        ></div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium">{source.source}</span>
                            <span>
                              {source.visitors.toLocaleString()} visitors
                            </span>
                          </div>
                          <Progress
                            value={(source.visitors / totalVisitors) * 100}
                            className="h-2"
                            style={{
                              background: `linear-gradient(to right, ${source.color}30, ${source.color}60)`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pages Tab Content */}
          <TabsContent value="pages">
            <Card className="bg-[#1A1A1A] border-[#333]">
              <CardHeader>
                <CardTitle>Page Performance</CardTitle>
                <CardDescription>
                  Track which pages are most engaging
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg overflow-hidden mb-6">
                  <table className="w-full">
                    <thead className="bg-[#222]">
                      <tr>
                        <th className="py-3 px-4 text-left">Page</th>
                        <th className="py-3 px-4 text-left">Views</th>
                        <th className="py-3 px-4 text-left">
                          Avg. Time on Page
                        </th>
                        <th className="py-3 px-4 text-left">
                          % of Total Views
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {pageViewData.map((page, index) => {
                        const totalViews = pageViewData.reduce(
                          (sum, p) => sum + p.views,
                          0
                        );
                        const percentOfTotal = (
                          (page.views / totalViews) *
                          100
                        ).toFixed(1);

                        return (
                          <tr
                            key={index}
                            className={
                              index % 2 === 0 ? "bg-[#1A1A1A]" : "bg-[#222]"
                            }
                          >
                            <td className="py-3 px-4">{page.page}</td>
                            <td className="py-3 px-4">
                              {page.views.toLocaleString()}
                            </td>
                            <td className="py-3 px-4">{page.timeOnPage} sec</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center">
                                <span className="mr-2">{percentOfTotal}%</span>
                                <div className="w-24 bg-[#333] h-2 rounded-full overflow-hidden">
                                  <div
                                    className="h-full rounded-full bg-[#39FF14]"
                                    style={{ width: `${percentOfTotal}%` }}
                                  ></div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="text-center text-sm text-gray-400">
                  <p>
                    This dashboard shows example data. In a production
                    environment, it would display real-time analytics from your
                    gym's website.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default AnalyticsDashboard;
