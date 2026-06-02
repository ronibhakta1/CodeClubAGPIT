'use client';

import { useState, useEffect } from 'react';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';
import { motion } from 'framer-motion';
import axios from 'axios';
import { BACKEND_URL } from '../../../config';

// Define interfaces for data
interface Member {
    id?: number;
    name: string;
    avatar: string;
    email: string;
    linkedin: string;
    role: string;
    domain: string;
    yearOfStudy: string;
    yearOfPassing: number;
    bio: string;
    social: {
        github: string;
        portfolio: string;
    };
}

interface CarouselImage {
    id: number;
    image: string;
    title: string;
    tagline: string;
}

export function AboutMembers() {
    const [members, setMembers] = useState<Member[]>([]);
    const [carouselImages, setCarouselImages] = useState<CarouselImage[]>([]);
    const [hoveredMemberId, setHoveredMemberId] = useState<number | null>(null);
    const [hoveredImageId, setHoveredImageId] = useState<number | null>(null);
    const [selectedBoard, setSelectedBoard] = useState<string>("TY");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const dummyMembers: Member[] = [
        {
            id: 1,
            name: "Roni Bhakta",
            avatar: "https://media.licdn.com/dms/image/v2/D4D03AQEvEHK2KOMLwQ/profile-displayphoto-shrink_100_100/0/1705087348506",
            email: "roni123@gmail.com",
            linkedin: "https://linkedin.com/in/ronibhakta1",
            role: "President",
            domain: "Full Stack Development",
            yearOfStudy: "3rd",
            yearOfPassing: 2026,
            bio: "Experienced full-stack developer passionate about building scalable web applications.",
            social: {
                github: "https://github.com/ronibhakta1",
                portfolio: "https://ronibhakta1.dev",
            },
        },
    ];

    const dummyCarouselImages: CarouselImage[] = [
        {
            id: 1,
            image: "/default-image.jpg",
            title: "Hackathon 2024",
            tagline: "Innovate and Create",
        },
    ];

    useEffect(() => {
        const fetchMembers = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${BACKEND_URL}/user/club-members/${selectedBoard}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setMembers(response.data.members);
            } catch (err: any) {
                console.error("Error loading members from backend:", err);
                setError("Failed to load members. Using default data.");
                try {
                    const fileName = `/club_members_${selectedBoard}.json`;
                    const response = await fetch(fileName);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    const membersWithIds = data.map((member: Member, index: number) => ({
                        ...member,
                        id: member.id || index,
                    }));
                    setMembers(membersWithIds);
                } catch (jsonErr) {
                    console.error("Error loading members from JSON:", jsonErr);
                    setMembers(dummyMembers);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
    }, [selectedBoard]);

    useEffect(() => {
        const fetchCarouselImages = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${BACKEND_URL}/user/carousel-images`);
                setCarouselImages(response.data.images);
            } catch (err: any) {
                console.error("Error loading carousel images from backend:", err);
                setError("Failed to load carousel images. Using default data.");
                try {
                    const response = await fetch('/carousel_images.json');
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    setCarouselImages(data);
                } catch (jsonErr) {
                    console.error("Error loading carousel images from JSON:", jsonErr);
                    setCarouselImages(dummyCarouselImages);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchCarouselImages();
    }, []);

    const handleBoardChange = (board: string) => {
        setSelectedBoard(board);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-gray-800">Loading...</div>
            </div>
        );
    }

    return (
        <div className="py-8 px-4">
            {error && <div className="text-red-400 text-center mb-4">{error}</div>}
            <div className="mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {carouselImages.map((item) => (
                        <div
                            key={item.id}
                            className="relative aspect-square h-[250px] overflow-hidden rounded-[8px] shadow-lg"
                            onMouseEnter={() => setHoveredImageId(item.id)}
                            onMouseLeave={() => setHoveredImageId(null)}
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="absolute inset-0 w-full h-full object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "/default-image.jpg";
                                }}
                            />
                            <ProgressiveBlur
                                className="pointer-events-none absolute bottom-0 left-0 h-[50%] w-full"
                                blurIntensity={0.5}
                                animate={hoveredImageId === item.id ? 'visible' : 'hidden'}
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: { opacity: 1 },
                                }}
                                transition={{ duration: 0.2, ease: 'easeOut' }}
                            />
                            <motion.div
                                className="absolute bottom-0 left-0 w-full"
                                animate={hoveredImageId === item.id ? 'visible' : 'hidden'}
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: { opacity: 1 },
                                }}
                                transition={{ duration: 0.2, ease: 'easeOut' }}
                            >
                                <div className="flex flex-col items-start gap-0 px-5 py-4">
                                    <p className="text-lg font-semibold text-black">{item.title}</p>
                                    <span className="text-sm text-black">{item.tagline}</span>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
            <h2 className="text-2xl font-bold text-center mb-6">Our Team</h2>
            <div className="flex justify-center gap-4 mb-8">
                <button
                    onClick={() => handleBoardChange("TY")}
                    className={`px-4 py-2 rounded ${selectedBoard === "TY" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
                >
                    Main Board
                </button>
                <button
                    onClick={() => handleBoardChange("SY")}
                    className={`px-4 py-2 rounded ${selectedBoard === "SY" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
                >
                    Assistant Board
                </button>
                <button
                    onClick={() => handleBoardChange("FY")}
                    className={`px-4 py-2 rounded ${selectedBoard === "FY" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
                >
                    Last Year Board
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {members.map((member, index) => (
                    <div
                        key={member.id || index}
                        className="relative aspect-square h-[300px] overflow-hidden rounded-[4px] shadow-lg"
                        onMouseEnter={() => setHoveredMemberId(member.id || index)}
                        onMouseLeave={() => setHoveredMemberId(null)}
                    >
                        <img
                            src={member.avatar || "/default-avatar.jpg"}
                            alt={member.name}
                            className="absolute inset-0 w-full h-full object-cover"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "/default-avatar.jpg";
                            }}
                        />
                        <ProgressiveBlur
                            className="pointer-events-none absolute bottom-0 left-0 h-[75%] w-full"
                            blurIntensity={0.5}
                            animate={hoveredMemberId === (member.id || index) ? 'visible' : 'hidden'}
                            variants={{
                                hidden: { opacity: 0 },
                                visible: { opacity: 1 },
                            }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                        />
                        <motion.div
                            className="absolute bottom-0 left-0 w-full"
                            animate={hoveredMemberId === (member.id || index) ? 'visible' : 'hidden'}
                            variants={{
                                hidden: { opacity: 0 },
                                visible: { opacity: 1 },
                            }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                        >
                            <div className="flex flex-col items-start gap-0 px-5 py-4">
                                <p className="text-base font-medium text-white">{member.name}</p>
                                <span className="text-base text-black">{member.role}</span>
                                <p className="text-sm text-zinc-400 mt-1 line-clamp-2">{member.bio}</p>
                            </div>
                        </motion.div>
                    </div>
                ))}
            </div>
        </div>
    );
}