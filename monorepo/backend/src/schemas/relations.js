"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRelation =
  exports.commentRelations =
  exports.userRelations =
    void 0;
const drizzle_orm_1 = require("drizzle-orm");
const _1 = require(".");
exports.userRelations = (0, drizzle_orm_1.relations)(_1.users, ({ many }) => ({
  posts: many(_1.posts),
  comments: many(_1.comments),
}));
exports.commentRelations = (0, drizzle_orm_1.relations)(
  _1.comments,
  ({ one }) => ({
    user: one(_1.users, {
      fields: [_1.comments.authorId],
      references: [_1.users.id],
    }),
    post: one(_1.posts, {
      fields: [_1.comments.postId],
      references: [_1.posts.id],
    }),
  })
);
exports.postRelation = (0, drizzle_orm_1.relations)(
  _1.posts,
  ({ one, many }) => ({
    user: one(_1.users, {
      fields: [_1.posts.author],
      references: [_1.users.id],
    }),
    comments: many(_1.comments),
  })
);
