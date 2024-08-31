"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";

import FileUpload from "@/components/file-upload";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const formSchema = z.object({
	name: z
		.string()
		.min(1, {
			message: "Server name is required.",
		})
		.max(32),
	imageUrl: z.string().min(1, {
		message: "Server image is required.",
	}),
});

const CustomizeServerModal = () => {
	const { isOpen, onClose, type, onOpen } = useModal();
	const router = useRouter();
	const { user, isLoaded } = useUser();

	const fullName = user?.fullName;

	const isModalOpen = isOpen && type === "customizeServer";

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: `${fullName}'s Server`,
			imageUrl: "",
		},
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		try {
			await axios.post("/api/servers", data);

			form.reset();
			onClose();
			router.refresh();
		} catch (error) {
			console.error(error);
		}
	};

	const handleClose = () => {
		form.reset();
		onClose();
	};

	useEffect(() => {
		if (!isLoaded) {
			return;
		}

		if (fullName) {
			form.setValue("name", `${fullName}'s Server`);
		}
	}, [isLoaded]);

	return (
		<Dialog open={isModalOpen} onOpenChange={handleClose}>
			<DialogContent className="bg-white text-black p-0 overflow-hidden">
				<DialogHeader className="pt-6 px-6">
					<DialogTitle className="text-2xl font-bold text-center">
						Customize your server
					</DialogTitle>
					<DialogDescription className="text-center text-zinc-500">
						Give your server a personality with a name and an image. You can
						always change it later.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<div className="space-y-8 px-6">
							<div className="flex items-center justify-center text-center">
								<FormField
									control={form.control}
									name="imageUrl"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<FileUpload
													endpoint="serverImage"
													value={field.value}
													onChange={field.onChange}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								></FormField>
							</div>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel
											className="uppercase text-zinc-500 font-bold text-sm dark:text-secondary/70
                    "
										>
											Server Name
										</FormLabel>
										<FormControl>
											<Input
												disabled={isLoading}
												{...field}
												placeholder="Server Name"
												className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<DialogFooter className="px-6 py-4 bg-gray-100">
							<div className="flex flex-1 justify-between">
								<button
									type="button"
									onClick={() => {
										onOpen("createServer");
									}}
								>
									<p className="text-black text-sm font-medium">Back</p>
								</button>
								<Button disabled={isLoading} type="submit" variant="primary">
									Create
								</Button>
							</div>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default CustomizeServerModal;
