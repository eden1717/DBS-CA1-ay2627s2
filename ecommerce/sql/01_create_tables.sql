-- Create review table
CREATE TABLE public.review (
    id SERIAL PRIMARY KEY,
    member_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    rating INTEGER NOT NULL,
    review_text TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_review_member
        FOREIGN KEY (member_id)
        REFERENCES public.member(id),

    CONSTRAINT fk_review_product
        FOREIGN KEY (product_id)
        REFERENCES public.product(id),

    CONSTRAINT chk_review_rating
        CHECK (rating BETWEEN 1 AND 5),

    CONSTRAINT chk_review_text
        CHECK (LENGTH(TRIM(review_text)) BETWEEN 1 AND 1000),

    CONSTRAINT uq_member_product
        UNIQUE (member_id, product_id)
);

-- Create comment table
CREATE TABLE public.comment (
    id SERIAL PRIMARY KEY,
    review_id INTEGER NOT NULL,
    member_id INTEGER NOT NULL,
    parent_comment_id INTEGER,
    comment_text TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,

    CONSTRAINT fk_comment_review
        FOREIGN KEY (review_id)
        REFERENCES public.review(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_comment_member
        FOREIGN KEY (member_id)
        REFERENCES public.member(id),

    CONSTRAINT uq_comment_review
        UNIQUE (id, review_id),

    CONSTRAINT fk_parent_comment
        FOREIGN KEY (parent_comment_id, review_id)
        REFERENCES public.comment(id, review_id),

    CONSTRAINT chk_comment_text
        CHECK (
            (is_deleted = TRUE AND comment_text = '')
            OR
            (is_deleted = FALSE AND
             LENGTH(TRIM(comment_text)) BETWEEN 1 AND 500)
        ),

    CONSTRAINT chk_comment_parent
        CHECK (parent_comment_id <> id)
);

-- Create indexes
CREATE INDEX idx_review_product
ON public.review(product_id);

CREATE INDEX idx_comment_review
ON public.comment(review_id);

CREATE INDEX idx_comment_parent
ON public.comment(parent_comment_id);

CREATE INDEX idx_comment_member
ON public.comment(member_id);