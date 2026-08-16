"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Users,
  Mail,
  MessageSquare,
  ArrowLeftRight,
  Inbox,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PAGE_SIZE = 10;

interface Inquiry {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  company: string;
  service: string;
  location: string;
  message: string;
  status: string;
  createdAt: string;
}

interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
}

interface Stats {
  totalInquiries: number;
  totalSubscribers: number;
  inquiriesByService: Record<string, number>;
  mostRecentInquiryDate: string | null;
  mostRecentSubscriberDate: string | null;
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDateShort(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/* ------------------------------------------------------------------ */
/*  Stats Cards                                                        */
/* ------------------------------------------------------------------ */

interface StatCard {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
  bgAccent: string;
}
function StatsCards({ stats, loading }: { stats: Stats | null; loading: boolean }) {
  const cards: StatCard[] = loading
    ? Array.from({ length: 4 }).map(() => ({
        title: "",
        value: "",
        icon: MessageSquare,
        accent: "",
        bgAccent: "",
      }))
    : [
        {
          title: "Total Inquiries",
          value: stats?.totalInquiries ?? 0,
          icon: MessageSquare,
          accent: "text-[#F05A00]",
          bgAccent: "bg-[#F05A00]/10",
        },
        {
          title: "Total Subscribers",
          value: stats?.totalSubscribers ?? 0,
          icon: Mail,
          accent: "text-emerald-400",
          bgAccent: "bg-emerald-400/10",
        },
        {
          title: "Most Recent Inquiry",
          value: formatDate(stats?.mostRecentInquiryDate ?? null),
          icon: Inbox,
          accent: "text-sky-400",
          bgAccent: "bg-sky-400/10",
        },
        {
          title: "Most Recent Subscriber",
          value: formatDate(stats?.mostRecentSubscriberDate ?? null),
          icon: Users,
          accent: "text-violet-400",
          bgAccent: "bg-violet-400/10",
        },
      ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((c, i) => (
        <Card
          key={i}
          className="border-white/10 bg-white/[0.03] backdrop-blur-sm"
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              {loading ? (
                <Skeleton className="h-4 w-32" />
              ) : (
                c.title
              )}
            </CardTitle>
            {loading ? (
              <Skeleton className="size-8 rounded-md" />
            ) : (
              <div className={`rounded-md p-2 ${c.bgAccent}`}>
                <c.icon className={`size-4 ${c.accent}`} />
              </div>
            )}
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-7 w-24" />
            ) : (
              <p
                className={`text-2xl font-bold ${
                  typeof c.value === "number" ? "text-white" : "text-gray-200 text-base"
                }`}
              >
                {c.value}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Pagination                                                         */
/* ------------------------------------------------------------------ */

function Pagination({
  offset,
  total,
  onPageChange,
}: {
  offset: number;
  total: number;
  onPageChange: (newOffset: number) => void;
}) {
  const from = total === 0 ? 0 : offset + 1;
  const to = Math.min(offset + PAGE_SIZE, total);
  const hasPrev = offset > 0;
  const hasNext = offset + PAGE_SIZE < total;

  return (
    <div className="flex items-center justify-between pt-4">
      <p className="text-sm text-gray-500">
        Showing <span className="text-gray-300">{from}–{to}</span> of{" "}
        <span className="text-gray-300">{total}</span>
      </p>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={!hasPrev}
          onClick={() => onPageChange(offset - PAGE_SIZE)}
          className="border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white disabled:opacity-30"
        >
          <ChevronLeft className="mr-1 size-4" />
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={!hasNext}
          onClick={() => onPageChange(offset + PAGE_SIZE)}
          className="border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white disabled:opacity-30"
        >
          Next
          <ChevronRight className="ml-1 size-4" />
        </Button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Table Skeleton                                                     */
/* ------------------------------------------------------------------ */

function TableSkeleton({ cols = 7 }: { cols?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, r) => (
        <div key={r} className="flex gap-4">
          {Array.from({ length: cols }).map((_, c) => (
            <Skeleton key={c} className="h-8 flex-1 rounded" />
          ))}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Inquiries Table                                                    */
/* ------------------------------------------------------------------ */

function InquiriesTab({
  services,
}: {
  services: Record<string, number>;
}) {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [serviceFilter, setServiceFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  const fetchInquiries = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        limit: String(PAGE_SIZE),
        offset: String(offset),
      });
      if (serviceFilter && serviceFilter !== "all") {
        params.set("service", serviceFilter);
      }
      const res = await fetch(`/api/admin/inquiries?${params}`);
      const json = await res.json();
      if (json.success) {
        setInquiries(json.data);
        setTotal(json.total);
      }
    } catch (err) {
      console.error("Failed to fetch inquiries:", err);
    } finally {
      setLoading(false);
    }
  }, [offset, serviceFilter]);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  const handleServiceChange = (value: string) => {
    setServiceFilter(value);
    setOffset(0);
  };

  const serviceOptions = Object.keys(services).sort();

  return (
    <div className="space-y-4">
      {/* Filter row */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm text-gray-400">
          <ArrowLeftRight className="mr-1 inline-block size-4 align-text-bottom" />
          Filter by Service:
        </span>
        <Select value={serviceFilter} onValueChange={handleServiceChange}>
          <SelectTrigger className="w-[220px] border-white/10 bg-white/5 text-gray-200">
            <SelectValue placeholder="All Services" />
          </SelectTrigger>
          <SelectContent className="border-white/10 bg-[#0e0e18]">
            <SelectItem value="all">All Services</SelectItem>
            {serviceOptions.map((s) => (
              <SelectItem key={s} value={s}>
                {s} ({services[s]})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-white/10 bg-white/[0.02]">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-gray-400">Name</TableHead>
              <TableHead className="text-gray-400">Phone</TableHead>
              <TableHead className="text-gray-400">Email</TableHead>
              <TableHead className="text-gray-400">Company</TableHead>
              <TableHead className="text-gray-400">Service</TableHead>
              <TableHead className="text-gray-400">Location</TableHead>
              <TableHead className="text-gray-400">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={7}>
                  <TableSkeleton cols={7} />
                </TableCell>
              </TableRow>
            ) : inquiries.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={7} className="py-16 text-center">
                  <Inbox className="mx-auto mb-3 size-10 text-gray-600" />
                  <p className="text-gray-500">No inquiries found.</p>
                </TableCell>
              </TableRow>
            ) : (
              inquiries.map((inq) => (
                <TableRow
                  key={inq.id}
                  className="border-white/5 transition-colors hover:bg-white/[0.04]"
                >
                  <TableCell className="font-medium text-gray-200">
                    {inq.firstName} {inq.lastName}
                  </TableCell>
                  <TableCell className="text-gray-400">
                    {inq.phone}
                  </TableCell>
                  <TableCell className="text-gray-400">
                    {inq.email || "—"}
                  </TableCell>
                  <TableCell className="text-gray-400">
                    {inq.company || "—"}
                  </TableCell>
                  <TableCell>
                    <span className="inline-block rounded-full bg-[#F05A00]/15 px-2.5 py-0.5 text-xs font-medium text-[#F05A00]">
                      {inq.service}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-400">
                    {inq.location || "—"}
                  </TableCell>
                  <TableCell className="text-gray-400">
                    {formatDateShort(inq.createdAt)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {!loading && total > 0 && (
        <Pagination
          offset={offset}
          total={total}
          onPageChange={setOffset}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Subscribers Table                                                  */
/* ------------------------------------------------------------------ */

function SubscribersTab() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchSubscribers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        limit: String(PAGE_SIZE),
        offset: String(offset),
      });
      const res = await fetch(`/api/admin/subscribers?${params}`);
      const json = await res.json();
      if (json.success) {
        setSubscribers(json.data);
        setTotal(json.total);
      }
    } catch (err) {
      console.error("Failed to fetch subscribers:", err);
    } finally {
      setLoading(false);
    }
  }, [offset]);

  useEffect(() => {
    fetchSubscribers();
  }, [fetchSubscribers]);

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-lg border border-white/10 bg-white/[0.02]">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-gray-400">Email</TableHead>
              <TableHead className="text-gray-400">Subscribed Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={2}>
                  <TableSkeleton cols={2} />
                </TableCell>
              </TableRow>
            ) : subscribers.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={2} className="py-16 text-center">
                  <Users className="mx-auto mb-3 size-10 text-gray-600" />
                  <p className="text-gray-500">No subscribers found.</p>
                </TableCell>
              </TableRow>
            ) : (
              subscribers.map((sub) => (
                <TableRow
                  key={sub.id}
                  className="border-white/5 transition-colors hover:bg-white/[0.04]"
                >
                  <TableCell className="font-medium text-gray-200">
                    {sub.email}
                  </TableCell>
                  <TableCell className="text-gray-400">
                    {formatDateShort(sub.subscribedAt)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {!loading && total > 0 && (
        <Pagination
          offset={offset}
          total={total}
          onPageChange={setOffset}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Admin Page                                                         */
/* ------------------------------------------------------------------ */

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/admin/stats");
        const json = await res.json();
        if (json.success) {
          setStats(json.stats);
        }
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      } finally {
        setStatsLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      {/* Stats Summary */}
      <section>
        <h2 className="mb-4 text-xl font-semibold text-white sm:text-2xl">
          Overview
        </h2>
        <StatsCards stats={stats} loading={statsLoading} />
      </section>

      {/* Data Tables */}
      <section>
        <Tabs defaultValue="inquiries" className="w-full">
          <TabsList className="mb-6 w-full justify-start rounded-lg border border-white/10 bg-white/[0.03] p-1">
            <TabsTrigger
              value="inquiries"
              className="data-[state=active]:bg-[#F05A00] data-[state=active]:text-white data-[state=active]:shadow-none text-gray-400 transition-colors"
            >
              <MessageSquare className="mr-2 size-4" />
              Contact Inquiries
            </TabsTrigger>
            <TabsTrigger
              value="subscribers"
              className="data-[state=active]:bg-[#F05A00] data-[state=active]:text-white data-[state=active]:shadow-none text-gray-400 transition-colors"
            >
              <Mail className="mr-2 size-4" />
              Newsletter Subscribers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="inquiries">
            <InquiriesTab services={stats?.inquiriesByService ?? {}} />
          </TabsContent>

          <TabsContent value="subscribers">
            <SubscribersTab />
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
