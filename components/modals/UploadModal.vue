<script setup lang="ts">
import uniqid from "uniqid";
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { useToast } from "@/components/ui/toast/use-toast";

import { useModalsStore } from "@/stores/modals";
import { useMainStore } from "@/stores/main";

const { onAddSong } = useMainStore();

const { toast } = useToast();

const supabaseClient = useSupabaseClient();

const { type, isOpen } = storeToRefs(useModalsStore());

const { onClose } = useModalsStore();

const isModalOpen = isOpen.value && type.value === "upload";

const isLoading = ref(false);

const { user } = await useUser();

const formSchema = toTypedSchema(
  z.object({
    title: z.string().min(1, {
      message: "Title is required.",
    }),
    author: z.string().min(1, {
      message: "Author image is required.",
    }),
    song: z
      .any()
      .refine((file) => file?.name, "Song is required.")
      .refine(
        (file) => ["audio/mpeg"].includes(file?.type),
        ".mp3 files are accepted."
      ),
    image: z
      .any()
      .refine((file) => file?.name, "Image is required.")
      //.refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
      .refine((file) => {
        console.log(file?.type);
        return ["image/jpg", "image/jpeg", "image/png", "image/webp"].includes(
          file?.type
        );
      }, ".jpg, .jpeg, .png and .webp files are accepted."),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const onImgUpload = (event) => {
  let file = event.target?.files[0] || null;
  form.setFieldValue("image", file);
};

const onSongUpload = (event) => {
  let file = event?.target?.files[0] || null;
  form.setFieldValue("song", file);
};

const onSubmit = form.handleSubmit(async (values) => {
  isLoading.value = true;
  const uniqueID = uniqid();

  try {
    // Upload song
    const { data: songData, error: songError } = await supabaseClient.storage
      .from("songs")
      .upload(`song-${values.title}-${uniqueID}`, values.song, {
        cacheControl: "3600",
        upsert: false,
      });

    if (songError) {
      isLoading.value = false;
      return toast({
        variant: "destructive",
        description: "Failed song upload",
        duration: 3000,
      });
    }

    // Upload image
    const { data: imageData, error: imageError } = await supabaseClient.storage
      .from("images")
      .upload(`image-${values.title}-${uniqueID}`, values.image, {
        cacheControl: "3600",
        upsert: false,
      });

    if (imageError) {
      isLoading.value = false;
      return toast({
        variant: "destructive",
        description: "Failed image upload",
        duration: 3000,
      });
    }

    // Create record

    const { error: supabaseError } = await supabaseClient.from("songs").insert({
      user_id: user.value?.id,
      title: values.title,
      author: values.author,
      image_path: imageData.path,
      song_path: songData.path,
    });

    if (supabaseError) {
      return toast({
        variant: "destructive",
        description: supabaseError.message,
        duration: 3000,
      });
    }

    isLoading.value = false;

    onAddSong();

    toast({
      variant: "default",
      description: "Song created!",
      duration: 3000,
    });

    form.resetForm();

    onClose();
  } catch (error) {
    toast({
      variant: "destructive",
      description: error?.message,
      duration: 3000,
    });
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <Modal
    title="Add a song"
    description="Upload an mp3 file"
    :show="isModalOpen"
    @close="onClose()"
  >
    <form @submit.prevent="onSubmit" class="flex flex-col gap-y-4 mt-4">
      <FormField v-slot="{ componentField }" name="title">
        <FormItem>
          <FormControl>
            <Input
              type="text"
              :disabled="isLoading"
              placeholder="Song title"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="author">
        <FormItem>
          <FormControl>
            <Input
              type="text"
              :disabled="isLoading"
              placeholder="Song author"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <div>
        <div class="pb-1">Select a song file</div>

        <FormField v-slot="{ componentField }" name="song">
          <FormItem>
            <FormControl>
              <Input
                placeholder="test"
                accept=".mp3"
                :disabled="isLoading"
                type="file"
                @change="onSongUpload"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
      <div>
        <div class="pb-1">Select an image</div>
        <FormField v-slot="{ componentField }" name="image">
          <FormItem>
            <FormControl>
              <Input
                placeholder="test"
                :inputProps="{ accept: 'image/*', placeholder: 'test' }"
                :disabled="isLoading"
                type="file"
                @change="onImgUpload"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
      <Button :disabled="isLoading" type="submit">
        {{ isLoading ? "Creating..." : "Create" }}
      </Button>
    </form>
  </Modal>
</template>
