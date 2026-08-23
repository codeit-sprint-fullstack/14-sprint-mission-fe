import { useRouter } from "next/router";
import styles from "./ProductRegistration.module.css";
import { useEffect, useState } from "react";
import { createProduct, uploadProductImage } from "@/api/productsApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function ProductRegistrationPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [accessToken, setAccessToken] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageError, setImageError] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [tagError, setTagError] = useState("");
  const [submitError, setSubmitError] = useState("");

  const MAX_IMAGE_COUNT = 3;
  const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

  const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

  useEffect(() => {
    const savedAccessToken = localStorage.getItem("accessToken");

    if (!savedAccessToken) {
      router.replace("/signin");
      return;
    }

    setAccessToken(savedAccessToken);
  }, [router]);

  const createProductMutation = useMutation({
    mutationFn: async () => {
      const imageUrls = [];

      for (const selectedImage of selectedImages) {
        const imageUrl = await uploadProductImage(
          selectedImage.file,
          accessToken,
        );

        imageUrls.push(imageUrl);
      }

      const productData = {
        images: imageUrls,
        tags,
        price: Number(price),
        description: description.trim(),
        name: name.trim(),
      };

      return createProduct(productData, accessToken);
    },

    onSuccess: (createdProduct) => {
      selectedImages.forEach((image) => {
        URL.revokeObjectURL(image.previewUrl);
      });

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      router.push(`/items/${createdProduct.id}`);
    },

    onError: (mutationError) => {
      if (mutationError.status === 401) {
        localStorage.removeItem("accessToken");
        router.replace("/signin");
        return;
      }

      setSubmitError(mutationError.message);
    },
  });

  const isSubmitDisabled =
    !accessToken ||
    selectedImages.length === 0 ||
    name.trim().length === 0 ||
    name.trim().length > 30 ||
    description.trim().length === 0 ||
    price.trim().length === 0 ||
    Number(price) < 0 ||
    Number(price) > 2147483647 ||
    !Number.isInteger(Number(price)) ||
    tags.length === 0;

  function handleImageButtonClick(event) {
    if (selectedImages.length >= MAX_IMAGE_COUNT) {
      event.preventDefault();
      setImageError("이미지는 최대 3개까지 등록할 수 있습니다.");
    }
  }

  function handleImageChange(event) {
    const selectedFiles = Array.from(event.target.files);
    const availableImageCount = MAX_IMAGE_COUNT - selectedImages.length;

    const invalidTypeFile = selectedFiles.find(
      (file) => !ALLOWED_IMAGE_TYPES.includes(file.type),
    );

    if (invalidTypeFile) {
      setImageError("JPG, JPEG, PNG, Webp 이미지만 등록할 수 있습니다.");
      event.target.value = "";
      return;
    }

    const oversizedFile = selectedFiles.find(
      (file) => file.size > MAX_IMAGE_SIZE,
    );

    if (oversizedFile) {
      setImageError("이미지는 한 장당 최대 5MB까지 등록할 수 있습니다.");
      event.target.value = "";
      return;
    }

    const filesToAdd = selectedFiles.slice(0, availableImageCount);

    const newImages = filesToAdd.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setSelectedImages((currentImages) => [...currentImages, ...newImages]);

    if (selectedFiles.length > availableImageCount) {
      setImageError("이미지는 최대 3개까지 등록할 수 있습니다.");
    } else {
      setImageError("");
    }

    event.target.value = "";
  }

  function handleRemoveImage(removePreviewUrl) {
    const removedImage = selectedImages.find(
      (image) => image.previewUrl === removePreviewUrl,
    );

    if (removedImage) {
      URL.revokeObjectURL(removedImage.previewUrl);
    }

    setSelectedImages((currentImages) =>
      currentImages.filter((image) => image.previewUrl !== removePreviewUrl),
    );
    setImageError("");
  }

  function handlePriceChange(event) {
    const onlyNumbers = event.target.value.replace(/[^0-9]/g, "");

    if (onlyNumbers === "" || Number(onlyNumbers) <= 2147483647) {
      setPrice(onlyNumbers);
    }
  }

  function handleTagKeyDown(event) {
    if (event.nativeEvent.isComposing) {
      return;
    }

    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();

    const newTag = tagInput.trim();

    if (newTag.length === 0) {
      return;
    }

    if (newTag.length > 20) {
      setTagError("태그는 20자 이하로 입력해주세요.");
      return;
    }

    if (tags.includes(newTag)) {
      setTagError("이미 등록한 태그입니다.");
      return;
    }

    setTags((currentTags) => [...currentTags, newTag]);
    setTagInput("");
    setTagError("");
  }

  function handleRemoveTag(removeTag) {
    setTags((currentTags) => currentTags.filter((tag) => tag !== removeTag));

    setTagError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitDisabled || createProductMutation.isPending) {
      return;
    }

    setSubmitError("");
    createProductMutation.mutate();
  }

  return (
    <main className={styles.registrationPage}>
      <form className={styles.registrationForm} onSubmit={handleSubmit}>
        <div className={styles.registrationHeader}>
          <h1 className={styles.pageTitle}>상품 등록하기</h1>

          <button
            className={styles.submitButton}
            type="submit"
            disabled={isSubmitDisabled || createProductMutation.isPending}
          >
            {createProductMutation.isPending ? "등록 중..." : "등록"}
          </button>
        </div>
        {submitError && <p className={styles.submitError}>{submitError}</p>}

        <section className={styles.imageSection}>
          <h2>상품 이미지</h2>

          <div className={styles.imageList}>
            <label
              className={styles.imageButton}
              htmlFor="product-images"
              onClick={handleImageButtonClick}
            >
              <span className={styles.plusIcon}>+</span>
              <span>이미지 등록</span>
            </label>

            <input
              className={styles.imageInput}
              id="product-images"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={handleImageChange}
            />

            {selectedImages.map((image, index) => (
              <div className={styles.previewBox} key={image.previewUrl}>
                <img
                  className={styles.previewImage}
                  src={image.previewUrl}
                  alt={`상품 이미지 미리보기 ${index + 1}`}
                />

                <button
                  className={styles.removeImageButton}
                  type="button"
                  onClick={() => handleRemoveImage(image.previewUrl)}
                  aria-label={`상품 이미지 ${index + 1} 삭제`}
                >
                  x
                </button>
              </div>
            ))}
          </div>

          {imageError && <p className={styles.imageError}>{imageError}</p>}
        </section>

        <div className={styles.inputGroup}>
          <label htmlFor="product-name">상품명</label>

          <input
            id="product-name"
            type="text"
            value={name}
            maxLength={30}
            placeholder="상품명을 입력해주세요."
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="product-description">상품 소개</label>

          <textarea
            id="product-description"
            value={description}
            placeholder="상품 소개를 입력해주세요"
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="product-price">판매가격</label>

          <input
            id="product-price"
            type="text"
            inputMode="numeric"
            value={price}
            placeholder="판매 가격을 입력해주세요"
            onChange={handlePriceChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="product-tag">태그</label>

          <input
            id="product-tag"
            type="text"
            value={tagInput}
            placeholder="태그를 입력해주세요"
            onChange={(event) => {
              setTagInput(event.target.value);
              setTagError("");
            }}
            onKeyDown={handleTagKeyDown}
          />

          {tagError && <p className={styles.tagError}>{tagError}</p>}

          {tags.length > 0 && (
            <div className={styles.tagList}>
              {tags.map((tag) => (
                <div className={styles.tagChip} key={tag}>
                  <span>#{tag}</span>

                  <button
                    className={styles.tagRemoveButton}
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    aria-label={`${tag} 태그 삭제`}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </form>
    </main>
  );
}
