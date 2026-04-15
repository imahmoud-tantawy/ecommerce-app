import React from "react";
import { Truck, ShieldCheck, RotateCcw, Headset } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      desc: "Orders over 500 EGP",
    },
    {
      icon: ShieldCheck,
      title: "Secure Payment",
      desc: "100% secure payment",
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      desc: "14-days return policy",
    },
    {
      icon: Headset,
      title: "Online Support",
      desc: "24/7 dedicated support",
    },
  ];

  return (
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <div key={i} className="flex items-center gap-4 group">
              <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm border border-gray-100">
                <feature.icon className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">{feature.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
